import { model, Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface INotes {
  _id: ObjectId;
  title: string;
  subject: string;
  tags: string[];
  userId: ObjectId;
  summary: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  recentlyViewed: Date;
}

const notesSchema = new Schema<INotes>(
  {
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    tags: { type: [String], required: true },
    summary: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    recentlyViewed: { type: Date, default: null },
  },
  { timestamps: true }
);

notesSchema.index({
  title: "text",
  subject: "text",
  tags: "text",
  summary: "text",
  content: "text",
});

export const Notes = model<INotes>("Note", notesSchema);
