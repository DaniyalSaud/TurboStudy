import { chromaClient } from "@/chromadb/db.js";
import type { Metadata } from "chromadb";
import { type Request, type Response } from "express";

export const createDocuments = async (req: Request, res: Response) => {
  try {
    const collectionName: string = "student";

    const {
      ids,
      documents,
      metadatas,
    }: { ids: string[]; documents: string[]; metadatas: Metadata[] } = req.body;
    if (!ids || !documents || !metadatas) {
      throw new Error("ids, documents, and metadatas are required");
    }

    const collection = await chromaClient.getCollection({
      name: collectionName,
    });
    if (!collection) {
      throw new Error(`Collection with name ${collectionName} does not exist`);
    }

    // Add documents to the collection
    await collection.add({
      ids,
      documents,
      metadatas,
    });

    res.status(201).json({
      success: true,
      message: "Document(s) created successfully",
    });
  } catch (error) {
    console.error("Error creating documents:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const collectionName: string = "student";

    const collection = await chromaClient.getCollection({
      name: collectionName,
    });
    if (!collection) {
      throw new Error(`Collection with name ${collectionName} does not exist`);
    }
    const documents = await collection.get({
      include: ["embeddings", "documents", "metadatas"],
      limit: 100,
    });
    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const deleteDocuments = async (req: Request, res: Response) => {
  try {
    const collectionName: string = "student";
    const { ids }: { ids: string[] } = req.body;
    if (!ids) {
      throw new Error("ids are required");
    }

    const collection = await chromaClient.getCollection({
      name: collectionName,
    });

    if (!collection) {
      throw new Error(
        `Collection with name "${collectionName}" does not exist`
      );
    }

    await collection.delete({ ids });
    res.status(200).json({
      success: true,
      message: "Document(s) deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting documents:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const updateDocument = async (req: Request, res: Response) => {
  try {
    const collectionName: string = "student";
    const {
      id,
      newDocument,
      newMetadata,
    }: { id: string; newDocument?: string; newMetadata?: Metadata } = req.body;
    if (!id) {
      throw new Error("id is required");
    }
    const collection = await chromaClient.getCollection({
      name: collectionName,
    });
    if (!collection) {
      throw new Error(`Collection with name ${collectionName} does not exist`);
    }

    // Fetch the existing document to update
    await collection.update({
      ids: [id],
      documents: [newDocument || ""],
      metadatas: [newMetadata || {}],
    });
    res.status(200).json({
      success: true,
      message: "Document updated successfully",
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
