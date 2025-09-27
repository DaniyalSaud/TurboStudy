import { chromaClient } from "@/chromadb/db.js";
import { GoogleGeminiEmbeddingFunction } from "@chroma-core/google-gemini";
import { type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const getCollections = async (req: Request, res: Response) => {
  try {
    const { collectionList }: { collectionList: string[] } = req.body;

    if (collectionList.length === 0) {
      throw new Error("Collection list is empty");
    }

    const collections = await chromaClient.getCollections(collectionList);

    res.status(200).json({
      message: "Collections fetched successfully",
      data: collections,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name }: { name: string } = req.body;
    if (!name) {
      throw new Error("Collection name is required");
    }

    const embedder = new GoogleGeminiEmbeddingFunction({
      apiKey: process.env.GOOGLE_API_KEY as string,
    });

    const collection = await chromaClient.createCollection({
      name: name,
      embeddingFunction: embedder,
    });

    res.status(201).json({
      success: true,
      message: "Collection created successfully",
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { name }: { name: string } = req.body;
    if (!name) {
      throw new Error("Collection name is required");
    }
    await chromaClient.deleteCollection({ name });
    res.status(200).json({
      message: "Collection deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(400).json({
      message: (error as Error).message,
      success: false,
    });
  }
};

