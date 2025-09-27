import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";

dotenv.config();

const pinecone = new Pinecone();

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY as string,
}  );

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex: pineconeIndex,
  maxRetries: 5,
});
