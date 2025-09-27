import { ChromaClient } from "chromadb";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

export const chromaClient = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

export const COLLECTION_NAME = "notes";

export const vectorstore = new Chroma(embeddings, {
  collectionName: COLLECTION_NAME,
  url: "http://localhost:8000",
});
