import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "~/components/ui/resizable";
import { Textarea } from "~/components/ui/textarea";
import Markdown from "react-markdown";
import { FileText, Edit3, Download, Loader2 } from "lucide-react";
import type { Route } from "./+types/notes.$id";
import { sessionContext } from "@/lib/session-context";
import { Notes } from "@/models/Notes";
import { ScrollArea } from "~/components/ui/scroll-area";
import AIChat from "@/components/dashboard/notes/ai-chat";
import { redirect } from "react-router";
import { Chat } from "@/models/Chat";
import { auth } from "@/lib/auth.server";

export async function loader({ params, request }: Route.LoaderArgs) {
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Note ID is required");
    }

    const data = await auth.api.getSession();

    if (!data || !data.session || !data.user) {
      throw redirect("/login");
    }

    const user = data.user;

    // Fetch the note by ID and userId and update the updatedAt timestamp
    const note = await Notes.findOneAndUpdate(
      { _id: id, userId: user.id },
      { $set: { recentlyViewed: new Date() } },
      { new: false },
    );

    if (!note) {
      throw new Error("Note not found");
    }

    let chat = await Chat.findOne({ noteId: note.id });
    if (!chat) {
      // Create a new chat associated with this note
      const newChat = new Chat({
        noteId: note.id,
        userId: user.id,
        systemPrompt: "None at the moment!",
        messages: [],
      });
      await newChat.save();

      chat = newChat;
    }

    if (chat?.userId.toString() !== user.id) {
      throw new Error("Unauthorized access to the note and its chat");
    }

    // Fetch messages for the chat

    // Serialize the note to make it JSON-safe
    const serializedNote = {
      _id: note.id,
      title: note.title,
      content: note.content,
      userId: note.userId.toString(),
      createdAt: note.createdAt?.toISOString(),
      updatedAt: note.updatedAt?.toISOString(),
      recentlyViewed: note.recentlyViewed?.toISOString(),
    };

    return { note: serializedNote };
  } catch (error) {
    console.error("Error loading note:", error);
    return { note: null, chat: null, messages: [] };
  }
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NotesPage({ loaderData }: Route.ComponentProps) {
  const { note } = loaderData;
  const [noteContent, setNoteContent] = useState<string>(note?.content || "");
  const [noteTitle, setNoteTitle] = useState(note?.title || "Untitled Note");
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(
    note?.updatedAt ? new Date(note.updatedAt) : null,
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSaveNote = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/notes", {
        body: JSON.stringify({
          noteId: note?._id,
          content: noteContent,
          title: noteTitle,
        }),
        method: "POST",
      });

      console.log("Save response:", response);
      if (!response.ok) {
        throw new Error(await response.json());
      }
    } catch (err) {
      console.error((err as Error).message);
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }
    // Here you would save to your backend
  };

  // Should not scroll
  return (
    <div className="h-screen px-0 py-2 sm:p-4">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Notes Panel - Left Side (60% initial) */}
        <ResizablePanel defaultSize={60} minSize={50}>
          <Card className="h-full flex flex-col p-0 border-0 sm:border sm:p-2">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-base sm:text-lg line-clamp-1">{noteTitle}</CardTitle>
                    <CardDescription className="text-sm">
                      {lastSaved && !isSaving
                        ? `Last saved: ${formatTime(lastSaved)}`
                        : "Not saved"}
                      {isSaving && (
                        <Loader2 className="w-4 h-4 inline-block ml-2 animate-spin" />
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(!isEditing);
                      if (isEditing) {
                        handleSaveNote();
                      }
                    }}
                  >
                    <Edit3 className="w-4 h-4 sm:mr-1" />
                    {isEditing ? "Preview" : "Edit"}
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSaveNote}
                    disabled={!isEditing}
                  >
                    <Download className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden">
              {isEditing ? (
                <Textarea
                  value={noteContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNoteContent(e.target.value)
                  }
                  placeholder="Start writing your notes..."
                  className="w-full h-full resize-none border-none focus:ring-0 font-mono text-sm"
                />
              ) : (
                <ScrollArea className="h-full">
                  <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none p-4">
                    <Markdown>{noteContent}</Markdown>
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle className="hidden sm:block opacity-0 rounded-full p-0.5 my-4 mx-1 hover:bg-neutral-700 dark:hover:bg-neutral-500 dark:hover:opacity-100 transition-all" />

        {/* Chat Panel - Right Side (40% initial) */}
        <AIChat chatId="342389438200342389438200" />
      </ResizablePanelGroup>
    </div>
  );
}
