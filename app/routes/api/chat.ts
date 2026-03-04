import { type Message as MyMessage } from "@/types/Message";
import type { Route } from "./+types/chat";
import { Message, type IMessage } from "@/models/Message";
import { formatMessages } from "@/utils/FormatMessages";
import { chatLLMChain } from "@/lib/langchain.server";
import { Chat } from "@/models/Chat";
import { auth } from "@/lib/auth.server";
import { Notes } from "@/models/Notes";
import { isValidObjectId } from "mongoose";

function isChatOwnedByUser(chat: { userId: unknown }, userId: string) {
  return String(chat.userId) === String(userId);
}

function getFallbackAIResponse(userMessage: string) {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return "I couldn't read your message. Please ask again.";
  }

  return `I couldn't generate a note-grounded answer right now for: "${trimmed}". Please try again in a moment.`;
}

async function resolveChatForUser({
  requestedChatId,
  noteId,
  userId,
}: {
  requestedChatId?: string;
  noteId?: string;
  userId: string;
}) {
  if (requestedChatId && isValidObjectId(requestedChatId)) {
    const existingChat = await Chat.findById(requestedChatId);
    if (existingChat && isChatOwnedByUser(existingChat, userId)) {
      return existingChat;
    }
  }

  if (!noteId || !isValidObjectId(noteId)) {
    return null;
  }

  const note = await Notes.findById(noteId);
  if (!note || String(note.userId) !== String(userId)) {
    return null;
  }

  let chat = await Chat.findOne({ noteId: note._id });
  if (!chat) {
    chat = await Chat.create({
      noteId: note._id,
      userId: note.userId,
      total_messages: 0,
      systemPrompt: "None at the moment!",
    });
  }

  if (!isChatOwnedByUser(chat, userId)) {
    return null;
  }

  return chat;
}

function buildNoteContext(note: {
  title: string;
  subject: string;
  tags: string[];
  summary: string;
  content: string;
}) {
  const lines = [
    `Title: ${note.title}`,
    `Subject: ${note.subject}`,
    note.tags?.length ? `Tags: ${note.tags.join(", ")}` : "",
    note.summary ? `Summary: ${note.summary}` : "",
    "",
    "Note Content:",
    note.content,
  ].filter(Boolean);

  return lines.join("\n");
}

function serializeMessage(message: {
  _id: { toString(): string };
  role: "user" | "assistant";
  content: string;
  status: "sent" | "pending" | "failed";
  chatId: { toString(): string } | string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: message._id.toString(),
    role: message.role,
    content: message.content,
    status: message.status,
    chatId: message.chatId.toString(),
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  };
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const data = await auth.api.getSession(request);
    if (!data?.user?.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const url = new URL(request.url);
    const chatId = url.searchParams.get("chatId");

    if (!chatId || !isValidObjectId(chatId)) {
      return new Response(
        JSON.stringify({ message: "Invalid chatId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const chat = await Chat.findById(chatId);

    if (!chat || !isChatOwnedByUser(chat, data.user.id)) {
      return new Response(
        JSON.stringify({ message: "Chat not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const history = await Message.find({ chatId }).sort({
      createdAt: 1,
    });

    return new Response(
      JSON.stringify({
        messages: history.map(serializeMessage),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST request
export async function action({ request }: Route.ActionArgs) {
  try {
    const data = await auth.api.getSession(request);
    if (!data?.user?.id) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json();
    const {
      userMessage,
      noteId,
    }: { userMessage: MyMessage; aiMessage?: MyMessage; noteId?: string } = body;

    const hasValidChatId = Boolean(
      userMessage?.chatId && isValidObjectId(userMessage.chatId)
    );
    const hasValidNoteId = Boolean(noteId && isValidObjectId(noteId));

    if (!hasValidChatId && !hasValidNoteId) {
      return new Response(
        JSON.stringify({ message: "Invalid chat context" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const chat = await resolveChatForUser({
      requestedChatId: hasValidChatId ? userMessage.chatId : undefined,
      noteId,
      userId: data.user.id,
    });

    if (!chat) {
      return new Response(
        JSON.stringify({ message: "Chat not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const note = await Notes.findOne({ _id: chat.noteId, userId: data.user.id }).lean();
    if (!note) {
      return new Response(
        JSON.stringify({ message: "Note not found for this chat" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const chatId = String(chat._id);

    // Let's insert both into the DB
    const [user, ai] = await Message.insertMany([
      {
        role: "user",
        status: userMessage.status,
        content: userMessage.content,
        chatId,
      },
      {
        role: "assistant",
        status: "pending",
        content: "",
        chatId,
      },
    ]);

    await Chat.findByIdAndUpdate(chatId, { $inc: { total_messages: 2 } });

    const history = await getHistory(chatId, 12);
    const noteContext = buildNoteContext({
      title: note.title,
      subject: note.subject,
      tags: note.tags,
      summary: note.summary,
      content: note.content,
    });

    // Then, we run the background job to generate the AI response
    let aiContent = "";

    try {
      aiContent = await generateAIResponse(userMessage.content, history, noteContext);
    } catch (generationError) {
      console.error("AI generation failed, using fallback response:", generationError);
      aiContent = getFallbackAIResponse(userMessage.content);
    }

    const updatedAI = await Message.findByIdAndUpdate(
      ai._id,
      {
        $set: {
          content: aiContent,
          status: "sent",
        },
      },
      { new: true }
    );

    if (!updatedAI) {
      throw new Error("Could not update assistant response.");
    }

    const responseBody = {
      message: "Messages saved successfully in the DB.",
      userMessage: serializeMessage(user),
      aiMessage: serializeMessage(updatedAI),
    };

    const successResponse = new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    console.log("Returning success response:", successResponse);
    return successResponse;
  } catch (error) {
    console.error("Error in /api/chat action:", error);
    const errorResponse = new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Returning error response:", errorResponse);
    return errorResponse;
  }
}

// Helper functions
async function getHistory(chatId: string, limit: number = 10): Promise<IMessage[]> {
  const history = await Message.find({ chatId })
    .sort({ createdAt: 1 })
    .limit(limit);
  return history;
}

async function generateAIResponse(
  userMessage: string,
  history: IMessage[],
  noteContext: string
) {
  const formattedMsgs = formatMessages(
    history.filter((message) => !(message.role === "assistant" && !message.content.trim()))
  );
  const aiResponse = await chatLLMChain.invoke({
    chat_history: formattedMsgs,
    context: noteContext,
    question: userMessage,
  });

  if (typeof aiResponse === "string") {
    return aiResponse;
  }

  return String(aiResponse ?? "");
}
