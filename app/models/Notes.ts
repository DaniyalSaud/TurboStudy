import mongoose, {
  Document,
  model,
  Schema,
  type WithTimestamps,
} from "mongoose";
import { ObjectId } from "mongodb";

export interface INotes extends WithTimestamps<Document> {
  title: string;
  subject: string;
  tags: string[];
  userId: ObjectId;
  summary: string;
  content: string;
  recentlyViewed: Date;
  status: "processing" | "failed" | "generated";
}

const notesSchema = new Schema<INotes>(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    tags: { type: [String], required: true },
    summary: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["processing", "failed", "generated"],
      default: "processing",
      required: true
    },
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
