import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

export interface IChat {
  noteId: ObjectId;
  systemPrompt: string;
  userId: ObjectId;
  total_messages: number;
}

const chatSchema = new Schema<IChat>(
  {
    noteId: { type: Schema.Types.ObjectId, ref: "Note", required: true },
    systemPrompt: { type: String, required: true },
    total_messages: { type: Number, required: true, default: 0 },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Chat = model<IChat>("Chat", chatSchema);
