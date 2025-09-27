import express, { type Request, type Response } from "express";
import aiRouter from "./ai/router.js";

const router = express.Router();

router.use("/ai", aiRouter);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API v1 is working!",
    health: "OK",
  });
});

export default router;
