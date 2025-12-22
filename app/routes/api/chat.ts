import { type Message as MyMessage } from "@/types/Message";
import type { Route } from "./+types/chat";
import { Message, type IMessage } from "@/models/Message";
import { ObjectId } from "mongodb";
import { formatMessages } from "@/utils/FormatMessages";
import { chatLLMChain } from "@/lib/langchain.server";

// POST request
export async function action({ request }: Route.ActionArgs) {
  try {
    const body = await request.json();
    const {
      userMessage,
      aiMessage,
    }: { userMessage: MyMessage; aiMessage: MyMessage } = body;

    // Let's insert both into the DB
    const [user, ai] = await Message.insertMany([
      {
        role: userMessage.role,
        status: userMessage.status,
        content: userMessage.content,
        chatId: new ObjectId(userMessage.chatId),
      },
      {
        role: aiMessage.role,
        status: "pending",
        content: "  ",
        chatId: new ObjectId(aiMessage.chatId),
      },
    ]);
    const count = 5;
    const history = await getHistory(count);

    // Then, we run the background job to generate the AI response
    generateAIResponse(userMessage, aiMessage, history, history.length);

    const responseBody = {
      message:
        "Messages saved successfully in the DB, generating AI response...",
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
async function getHistory(limit: number = 10): Promise<IMessage[]> {
  const history = await Message.find().sort({ createdAt: -1 }).limit(limit);
  return history;
}

async function generateAIResponse(
  userMessage: MyMessage,
  aiMessage: MyMessage,
  history: IMessage[],
  count: number
) {
  console.log("Generating AI response for message ID:", userMessage.id);
  const formattedMsgs = formatMessages(history);
  const aiResponse = await chatLLMChain.invoke({
    chat_history: formattedMsgs,
    context: "None at the moment.",
    question: userMessage.content,
  });
  console.log("AI Response:", aiResponse);
}
