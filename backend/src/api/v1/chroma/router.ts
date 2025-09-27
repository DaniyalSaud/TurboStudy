import { createCollection, getCollections } from "@/controllers/chroma-db-controller.js";
import express from "express";
import docRouter from "@/api/v1/chroma/documents/router.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Chroma API is working!",
    health: "OK",
  });
});

router.get("/collections", getCollections);
router.post("/collection", createCollection )

router.use("/collection/document", docRouter);

export default router;
