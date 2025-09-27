import express, { type Request, type Response } from "express";
import v1Router from "./api/v1/router.js";
import dotenv from "dotenv";
import { connectDB } from "./db/config.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.get("/api", async (req: Request, res: Response) => {

  res.status(200).json({
    message: "Express Server is working!",
    health: "OK",
  });
});

// Router Paths
// Current API : v1
app.use("/api/v1", v1Router);

// Future API : v2
// app.use("/api/v2", v2Router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
