import { createBot } from "whatsapp-cloud-api";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";

import NodeCache from "node-cache";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
// Router

import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import { handleMessage } from "./routes/webhook.js";

const app = express();

// Use Router for API routes

export const myCache = new NodeCache();


dotenv.config();

const port = Number(process.env.port) || Number(5000);
const from = process.env.FROM;
const token = process.env.TOKEN;
const to = process.env.TO;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
const MongoDB_URL = process.env.MongoDB_URL;
const host = process.env.host || "127.0.0.1";

export const bot = createBot(from, token);

(async () => {
  try {
    await connectDB(MongoDB_URL);

    // Start express server to listen for incoming messages
    await bot.startExpressServer({
      webhookVerifyToken: webhookVerifyToken,
      port: port,
      host: host,
      useMiddleware: (app) => {
        app.use(express.json());
        app.use(morgan("dev"));
        app.use(cors({ origin: true, credentials: true }));

        // Routes
        app.use("/api/v1/user", userRouter);
        app.use("/api/v1/chat", chatRouter);
        app.use(errorMiddleware);
      },
    });

    bot.on("text", handleMessage);
  } catch (err) {
    console.log(err);
  }
})();
