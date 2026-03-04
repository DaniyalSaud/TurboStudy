import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@/types/Message";
import { Bot, SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import MessageBubble from "./message-bubble";

const quickPrompts = [
  {
    category: "Summarize",
    text: "Summarize the main points of this note.",
  },
  {
    category: "Explain",
    text: "Explain the concepts in this note.",
  },
  { category: "Quiz", text: "Create a quiz based on this note." },
  {
    category: "Examples",
    text: "Provide examples related to this note.",
  },
];

export default function AIChat({
  chatId,
  noteId,
  initialMessages,
}: {
  chatId: string;
  noteId: string;
  initialMessages?: Message[];
}) {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!initialMessages?.length) {
      setChatHistory([]);
      return;
    }

    setChatHistory(
      initialMessages.map((msg) => ({
        ...msg,
        createdAt: new Date(msg.createdAt),
        updatedAt: new Date(msg.updatedAt),
      }))
    );
  }, [initialMessages]);

  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const handleSendMessage = async () => {
    try {
      if (!message.trim()) return;
      if (!chatId) {
        throw new Error("Chat is not initialized yet.");
      }

      setIsSending(true);

      const now = new Date();
      const pendingUserMessageId = crypto.randomUUID();
      const pendingAIMessageId = crypto.randomUUID();

      const newUserMessage: Message = {
        id: pendingUserMessageId,
        role: "user",
        status: "sent",
        content: message,
        chatId,
        createdAt: now,
        updatedAt: now,
      };

      const aiMessage: Message = {
        id: pendingAIMessageId,
        role: "assistant",
        status: "pending",
        content: "",
        chatId,
        createdAt: now,
        updatedAt: now,
      };

      setChatHistory((prev) => [...prev, newUserMessage, aiMessage]);
      setMessage("");

      const body = {
        userMessage: newUserMessage,
        aiMessage: aiMessage,
        noteId,
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        let errorMessage = "Failed to POST message to chat API";

        try {
          const errorBody = await res.json();
          errorMessage = errorBody?.error || errorBody?.message || errorMessage;
        } catch {
          const text = await res.text();
          if (text) {
            errorMessage = text;
          }
        }

        throw new Error(errorMessage);
      }

      const payload = await res.json();

      if (payload?.aiMessage) {
        setChatHistory((prev) =>
          prev.map((msg) =>
            msg.id === pendingAIMessageId
              ? {
                  ...msg,
                  id: payload.aiMessage.id,
                  content: payload.aiMessage.content,
                  status: payload.aiMessage.status,
                  createdAt: new Date(payload.aiMessage.createdAt),
                  updatedAt: new Date(payload.aiMessage.updatedAt),
                }
              : msg
          )
        );
      }

      console.log("Message sent to API successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage =
        error instanceof Error && error.message
          ? error.message
          : "Failed to get response.";

      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.status === "pending"
            ? { ...msg, status: "failed", content: errorMessage }
            : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <ResizablePanel defaultSize={40} minSize={30} className="hidden sm:block">
      <Card className="h-full flex flex-col p-0 sm:p-2">
        {/* Chat Header — mirrors the notes panel header */}
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Bot className="w-5 h-5 text-primary shrink-0" />
              <div className="min-w-0">
                <CardTitle className="text-base sm:text-lg">TurboStudy AI</CardTitle>
                <CardDescription className="text-xs">
                  Grounded in this note
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt.category}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 hidden lg:inline-flex"
                  onClick={() => handleQuickPrompt(prompt.text)}
                >
                  {prompt.category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-4 py-4 space-y-3">
              {chatHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Bot className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">No messages yet</p>
                  <p className="text-xs text-muted-foreground max-w-50">
                    Ask anything about this note to get started.
                  </p>
                </div>
              )}

              {chatHistory.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <div className="border-t p-3">
          <div className="flex gap-2">
            <Input
              type="text"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleSendMessage()
              }
              placeholder="Ask about your note..."
              disabled={isSending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isSending}
              size="icon"
              variant="outline"
              className="shrink-0"
            >
              <SendHorizonal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </ResizablePanel>
  );
}
