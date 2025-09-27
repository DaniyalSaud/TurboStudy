import { createDocuments, deleteDocuments, getDocuments, updateDocument } from "@/controllers/chroma-doc-controller.js";
import { create } from "domain";
import express from "express";

const router = express.Router();

router.get("/", getDocuments);
router.post("/", createDocuments);
router.put("/", updateDocument);
router.delete("/", deleteDocuments);


export default router;