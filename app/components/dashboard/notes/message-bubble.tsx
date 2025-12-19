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
      className={`flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[65%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md transition-transform hover:scale-110 ${
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700"
              : "bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-1">
          {isPending && !isUser ? (
            /* WhatsApp-style typing indicator for assistant */
            <div className="rounded-2xl p-2 shadow-sm bg-white dark:bg-gray-800 rounded-bl-md border border-gray-200 dark:border-gray-700">
              <div className="flex gap-1 items-center h-6">
                <style>{`
                  @keyframes typing-bounce {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-8px); }
                  }
                  .typing-dot {
                    animation: typing-bounce 1.4s infinite ease-in-out;
                  }
                  .typing-dot:nth-child(1) { animation-delay: 0s; }
                  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
                `}</style>
                <div className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
                <div className="typing-dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"></div>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl px-4 py-2.5 sm:px-2 sm:py-2 shadow-sm transition-all hover:shadow-md ${
                isPending
                  ? "bg-gradient-to-br from-blue-600/70 to-blue-700/70 text-white rounded-br-md dark:from-blue-700/70 dark:to-blue-800/70 opacity-75"
                  : isUser
                  ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md dark:from-blue-700 dark:to-blue-800"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md border border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>
          )}
          
          {/* Timestamp */}
          {!isPending && (
            <div
              className={`text-xs px-2 ${
                isUser ? "text-right" : "text-left"
              } text-gray-500 dark:text-gray-400`}
            >
              {formatTime(message.createdAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
