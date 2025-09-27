import { type Request, type Response } from "express";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { vectorstore } from "@/chromadb/db.js";
import type { Collection } from "chromadb";
import multer from "multer";
import { auth } from "@/auth.js";

type Body = {
  metadata: Record<string, any>;
};

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

export const uploadMiddleware = upload.single('docs');

export const createNotes = async (req: Request, res: Response) => {
  try {
    console.log("Received Body:", req.body);
    const { metadata }: Body = req.body;
    const docs = req.file;
    if (!docs || !metadata) {
      throw new Error("Document and metadata are required");
    }

    const notes_string = "My Notes from Gemini Model.";
    auth

    // Now, i will create embedding for notes_string and store it in chroma db

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separators: ["\n\n", "\n", " ", ""],
    });

    const allSplits = await textSplitter.createDocuments([notes_string]);

    await vectorstore.addDocuments(allSplits);

    res.status(201).json({
      success: true,
      message: "Notes created successfully",
    });
  } catch (error) {
    console.error("Error creating notes:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const { id }: { id: string } = req.body;
    if (!id) {
      throw new Error("Note ID is required");
    }

    const notes = await (
      (await vectorstore.index?.getCollection({ name: "notes" })) as Collection
    ).get({ ids: [id] });

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getSimilarNotes = async (req: Request, res: Response) => {};

export const deleteNotes = async (req: Request, res: Response) => {};

export const updateNote = async (req: Request, res: Response) => {};
