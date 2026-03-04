import React, { useRef, useState } from "react";
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
import { FileText, Edit3, Download, Save, Loader2 } from "lucide-react";
import type { Route } from "./+types/notes.$id";
import { sessionContext } from "@/lib/session-context";
import { Notes } from "@/models/Notes";
import { ScrollArea } from "~/components/ui/scroll-area";
import AIChat from "@/components/dashboard/notes/ai-chat";
import { redirect } from "react-router";
import { Chat } from "@/models/Chat";
import { Message } from "@/models/Message";
import { auth } from "@/lib/auth.server";

export async function loader({ params, request }: Route.LoaderArgs) {
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Note ID is required");
    }

    const data = await auth.api.getSession(request);

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
    const messages = await Message.find({ chatId: chat._id }).sort({ createdAt: 1 });

    const serializedMessages = messages.map((msg) => ({
      id: msg._id.toString(),
      role: msg.role,
      content: msg.content,
      status: msg.status,
      chatId: msg.chatId.toString(),
      createdAt: msg.createdAt.toISOString(),
      updatedAt: msg.updatedAt.toISOString(),
    }));

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

    return {
      note: serializedNote,
      chatId: chat._id.toString(),
      noteId: note.id,
      initialMessages: serializedMessages,
    };
  } catch (error) {
    console.error("Error loading note:", error);
    return { note: null, chatId: null, noteId: null, initialMessages: [] };
  }
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NotesPage({ loaderData }: Route.ComponentProps) {
  const { note, chatId, noteId, initialMessages } = loaderData;
  const [noteContent, setNoteContent] = useState<string>(note?.content || "");
  const [noteTitle, setNoteTitle] = useState(note?.title || "Untitled Note");
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(
    note?.updatedAt ? new Date(note.updatedAt) : null,
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const markdownRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      // Render the markdown into a temporary off-screen container so we capture full content
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "800px";
      container.style.padding = "40px";
      container.style.background = "#ffffff";
      container.style.color = "#1a1a1a";
      container.style.fontFamily = "Georgia, 'Times New Roman', serif";
      container.style.fontSize = "14px";
      container.style.lineHeight = "1.7";
      container.innerHTML = `
        <h1 style="font-size:24px;font-weight:700;margin-bottom:8px;color:#111">${noteTitle}</h1>
        <div style="font-size:12px;color:#666;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e5e5e5">
          ${lastSaved ? new Date(lastSaved).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
        </div>
        <div class="prose prose-sm max-w-none">${markdownRef.current?.innerHTML || ""}</div>
      `;
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const safeName = noteTitle.replace(/[^a-zA-Z0-9 ]/g, "").trim() || "note";
      pdf.save(`${safeName}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

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

  return (
    <div className="h-screen px-0 py-2 sm:p-4">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Notes Panel */}
        <ResizablePanel defaultSize={60} minSize={50}>
          <Card className="h-full flex flex-col p-0 border-0 sm:border sm:p-2">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  <div className="min-w-0">
                    <CardTitle className="text-base sm:text-lg line-clamp-1">{noteTitle}</CardTitle>
                    <CardDescription className="text-xs">
                      {lastSaved && !isSaving
                        ? `Last saved: ${formatTime(lastSaved)}`
                        : "Not saved"}
                      {isSaving && (
                        <Loader2 className="w-3 h-3 inline-block ml-1 animate-spin" />
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (isEditing) handleSaveNote();
                      setIsEditing(!isEditing);
                    }}
                  >
                    {isEditing ? (
                      <><Save className="w-4 h-4" /><span className="hidden sm:inline">Save</span></>
                    ) : (
                      <><Edit3 className="w-4 h-4" /><span className="hidden sm:inline">Edit</span></>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">PDF</span>
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
                  <div ref={markdownRef} className="prose prose-sm prose-neutral dark:prose-invert max-w-none p-4">
                    <Markdown>{noteContent}</Markdown>
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </ResizablePanel>

        <ResizableHandle className="hidden sm:block opacity-0 rounded-full p-0.5 my-4 mx-1 hover:bg-muted-foreground/30 transition-all" />

        {/* Chat Panel */}
        {chatId && noteId && (
          <AIChat chatId={chatId} noteId={noteId} initialMessages={initialMessages as any} />
        )}
      </ResizablePanelGroup>
    </div>
  );
}
