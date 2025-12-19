export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
  updatedAt: Date;
  chatId: string;
  status: "failed" | "sent" | "pending";
}
