import type { Message } from "@/types/Message";
import { Bot, User } from "lucide-react";

const formatTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("default", options).format(new Date(date));
};

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isPending = message.status === "pending";

  return (
    <div
      className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-200 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-2 max-w-[88%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isUser ? (
            <User className="w-3.5 h-3.5" />
          ) : (
            <Bot className="w-3.5 h-3.5" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          {isPending && !isUser ? (
            <div className="rounded-2xl px-3 py-2 border border-border bg-card text-card-foreground">
              <div className="flex gap-1.5 items-center h-5">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-bounce" />
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl px-3 py-2 border ${
                isPending
                  ? "bg-primary/70 text-primary-foreground opacity-80"
                  : isUser
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-card-foreground border-border"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                {message.content}
              </div>
            </div>
          )}

          {!isPending && (
            <div
              className={`text-[11px] px-1 ${
                isUser ? "text-right" : "text-left"
              } text-muted-foreground`}
            >
              {formatTime(message.createdAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
