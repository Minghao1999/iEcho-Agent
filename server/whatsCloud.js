import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http"; // Import http module for creating server
import morgan from "morgan";
import { Server } from "socket.io"; // Import socket.io
import { createBot } from "whatsapp-cloud-api";
import Schedule from "./models/Schedule.js";

import NodeCache from "node-cache";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
// Router

import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import { handleMessage } from "./controllers/webhook.js";
import { scheduleAndSendMessages } from "./controllers/Schedule.js";

const app = express();
const server = createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Use Router for API routes

export const myCache = new NodeCache();

dotenv.config();

const port = Number(process.env.PORT) || 5000; // Change port to process.env.PORT or default to 5000
const from = process.env.FROM;
const token = "TOKEN";
const to = process.env.TO;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
const MongoDB_URL = process.env.MongoDB_URL;
const host = process.env.host || "127.0.0.1";

const socketport = 8000;
app.get("/",(req,res)=>{
  res.json({message: "Socket Sever is running"})
})
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

    bot.on("text", (message) => {
      handleMessage(message, io);
    });

    // Socket.io connection
    io.on("connection", (socket) => {
      console.log(`Client connected to ${socket.id}`);

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    server.listen(socketport, () => {
      console.log(`Socket Server running on port ${socketport}`);
    });
    // Schedule good night message function
    scheduleAndSendMessages();
  } catch (err) {
    console.log(err);
  }
})();

