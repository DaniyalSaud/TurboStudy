import { model, Schema, type WithTimestamps } from "mongoose";
import { ObjectId } from "mongodb";
import type { Document } from "mongoose";

export interface IMessage extends WithTimestamps<Document> {
  role: "user" | "assistant";
  chatId: ObjectId;
  content: string;
  status: "failed" | "pending" | "sent";
}

const messageSchema = new Schema<IMessage>(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    status: {
      type: String,
      enum: ["failed", "pending", "sent"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
