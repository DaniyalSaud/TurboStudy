import { model, Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface IMessage {
  role: "user" | "assistant";
  chatId: ObjectId;
  content: string;
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
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
