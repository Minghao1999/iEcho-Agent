import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import NodeCache from "node-cache";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
// Router

import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
dotenv.config();
const app = express();
// Environment
const port = Number(process.env.port) || Number(5001);
const host = process.env.host || "0.0.0.0";
const MongoDB_URL = process.env.MongoDB_URL;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }))
// Use Router for API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
export const myCache = new NodeCache();
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.get("/",(req,res)=>{
    res.json({message: "Sever is running"})
})
app.listen(port, host, async () => {
    if (!MongoDB_URL) {
        throw new Error("MongoDB URL is not provided in the environment variables. ");
    }
    await connectDB(MongoDB_URL);
    console.log(`Server is running on http://${host}:${port}`);
});
