// index.mjs

import { createBot } from "whatsapp-cloud-api";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { genAIModel } from "./utils/chatAI.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));

dotenv.config();

const from = process.env.FROM;
const token = process.env.TOKEN;
const to = process.env.TO;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;

const  template = [
  {
    role: "user",
    parts: "what is your task ",
  },
  {
    role: "model",
    parts: "You are Hollywood Celebrity name Faijan. Your Task to answer message in WhatsApp. Send answer like a human being and don't mentioned that you are assistant .",
  },
];

(async () => {
  try {
    let conversation=template
    // Create a bot that can send messages
    const bot = createBot(from, token);
    await bot.sendText(to, "messageResponse");


    // Start express server to listen for incoming messages
    await bot.startExpressServer({
      webhookVerifyToken: webhookVerifyToken,
      port: 3000,
      useMiddleware: (app) => {
        app.get("/", (req, res) => {
          return res.sendStatus(200);
        });
      },
    });

    bot.on("text", async (msg) => {
      console.log(msg);
      const prompt = msg.data.text;
 
      const chatSession = genAIModel.startChat({
        history: conversation,
      });

      conversation.push({ role: "user", parts: prompt });


      const result = await chatSession.sendMessage(prompt);
      const messageResponse = result.response.text();
      await bot.sendText(msg.from, messageResponse);

      conversation.push({ role: "model", parts: messageResponse });
      console.log(conversation);
    });

  } catch (err) {
    console.log(err);
  }
})();
