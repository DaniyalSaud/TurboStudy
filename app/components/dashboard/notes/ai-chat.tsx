import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import type { Message } from "@/types/Message";
import { Bot, History, Send, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import MessageBubble from "./message-bubble";


const quickPrompts = [
  {
    category: "Summarize",
    text: "Summarize the main points of this note.",
    icon: Bot,
  },
  {
    category: "Explain",
    text: "Explain the concepts in this note.",
    icon: Bot,
  },
  { category: "Quiz Me", text: "Create a quiz based on this note.", icon: Bot },
  {
    category: "Examples",
    text: "Provide examples related to this note.",
    icon: Bot,
  },
];

const generateAIResponse = (userMessage: string): string => {
  // Simple response generation for demo
  if (userMessage.toLowerCase().includes("explain")) {
    return "I'd be happy to explain the concepts in your note! Based on the content I can see, let me break down the key points with detailed explanations and examples.";
  } else if (
    userMessage.toLowerCase().includes("quiz") ||
    userMessage.toLowerCase().includes("question")
  ) {
    return "Great idea! Here are some practice questions based on your note:\n\n1. What are the main concepts covered in this study material?\n2. Can you explain the relationship between the key points mentioned?\n3. How would you apply these concepts in a real-world scenario?\n\nWould you like me to create more questions or explain any of these topics?";
  } else if (userMessage.toLowerCase().includes("summary")) {
    return "Here's a comprehensive summary of your note:\n\n**Key Concepts:**\n• Main topics and their significance\n• Important relationships between ideas\n• Critical details to remember\n\n**Study Focus:**\n• Core principles to understand\n• Practical applications\n• Areas that might need more review\n\nWould you like me to elaborate on any specific section?";
  } else {
    return "That's an interesting question about your note! I can help you understand this topic better. Could you provide more specific details about what you'd like to focus on from your study material?";
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AIChat({ chatId }: { chatId: string }) {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const handleQuickPrompt = (prompt: string) => {
    setMessage(prompt);
  };

  const handleSendMessage = async () => {
    try {
      if (!message.trim()) return;
      const newUserMessage: Message = {
        id: new Date().getTime().toString(),
        role: "user",
        status: "sent",
        content: message,
        chatId, // Placeholder, set appropriately
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const aiMessage: Message = {
        id: new Date().getTime().toString() + "4",
        role: "assistant",
        status: "pending",
        content: "  ",
        chatId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setChatHistory((prev) => [...prev, newUserMessage, aiMessage]);
      const body = {
        userMessage: newUserMessage,
        aiMessage: aiMessage,
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to POST message to chat API");
      }

      console.log("Message sent to API successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setMessage("");
      setIsTyping(false);
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <ResizablePanel defaultSize={40} minSize={30} className="hidden sm:block">
      <Card className="h-full flex flex-col">
        {/* Chat Header */}
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">TurboStudy AI</CardTitle>
                <CardDescription className="text-sm">
                  Ask questions about your note
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
          </div>
        </CardHeader>

        {/* Quick Actions */}
        <div className="border-b p-3">
          <div className="text-xs font-medium text-gray-500 mb-2">
            Quick Actions
          </div>
          <div className="flex flex-wrap gap-1">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => handleQuickPrompt(prompt.text)}
              >
                <prompt.icon className="w-3 h-3 mr-1" />
                {prompt.category}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {chatHistory.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-[85%]">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Input Area */}
        <div className="border-t p-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
                onKeyDownCapture={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && handleSendMessage()
                }
                placeholder="Ask about your note..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </ResizablePanel>
  );
}
