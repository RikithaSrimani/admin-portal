// backend/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://admin-portal-two-teal.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// Optional health route to test quickly
app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);

// ✅ Connect DB once (serverless-safe if connectDB is cached)
await connectDB();

export default app;
