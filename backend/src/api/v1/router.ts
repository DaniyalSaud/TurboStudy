import express, { type Request, type Response } from "express";
import aiRouter from "@/api/v1/ai/router.js";
import chromaRouter from "@/api/v1/chroma/router.js";

const router = express.Router();

router.use("/ai", aiRouter);
router.use("/chroma", chromaRouter);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API v1 is working!",
    health: "OK",
  });
});

export default router;
