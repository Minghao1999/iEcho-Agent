import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {createServer} from "http"; // Import http module for creating server
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
const token = process.env.TOKEN;
const to = process.env.TO;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
const MongoDB_URL = process.env.MongoDB_URL;
const host = process.env.host || "127.0.0.1";

const socketport=8000

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
      handleMessage(message,io);
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
    scheduleAndSendMessages(); // Schedule a message to be sent at 10:00


  } catch (err) {
    console.log(err);
  }

})();
// function scheduleMessage(time) {
//   // Split the time string into hours and minutes
//   const [hours, minutes] = time.split(':').map(Number);

//   // Get the current date and time
//   const now = new Date();

//   // Calculate the target time for the given hours and minutes
//   const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

//   // Calculate the time difference until the target time
//   let timeDifference = targetTime - now;

//   // If the target time has already passed for today, add 24 hours to schedule it for tomorrow
//   if (timeDifference < 0) {
//     timeDifference += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//   }

//   setTimeout(function() {
//     console.log("Good night!");
//     bot.sendText('917796577820','Good night!');
//     // Call your function here
//     // Example: goodNightMessageFunction();
//   }, timeDifference); // Schedule message for the calculated time difference
// }
// async function scheduleAndSendMessages(time) {
//   try {
//     // Split the time string into hours and minutes
//     const [hours, minutes] = time.split(':').map(Number);

//     // Get the current date and time
//     const now = new Date();

//     // Calculate the target time for the given hours and minutes
//     const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

//     // Calculate the time difference until the target time
//     let timeDifference = targetTime - now;

//     // If the target time has already passed for today, add 24 hours to schedule it for tomorrow
//     if (timeDifference < 0) {
//       timeDifference += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//     }
//     console.log(timeDifference)
//     setTimeout(async function() {
//       // Log the scheduled time
//       console.log("Scheduled time reached:", targetTime);

//       // Find scheduled messages where the scheduled timestamp is before or equal to the current time
//       const scheduledMessages = await Schedule.find({
//         'data.scheduletimestamp': { $lte: targetTime }
//       });

//       // Iterate through each scheduled message
//       for (const message of scheduledMessages) {
//         const { phonenumber, text } = message.data;

//         // Compare the scheduled timestamp with the current time
//         if (targetTime >= message.data.scheduletimestamp) {
//           // Send the message using your bot implementation
//           // await bot.sendMessage(phonenumber, text);
//           console.log("phonenumber: " + phonenumber ,"text"+text);

//           // Update the timestamp to mark it as sent
//           message.data.timestamp = new Date();

//           // Save the updated message
//           await message.save();

//           // Log the text
//           console.log('Scheduled message sent:', text);
//         }
//       }
//     }, timeDifference); // Schedule message for the calculated time difference
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }


async function scheduleAndSendMessages() {
  try {
      // Get the current time in UTC
      const nowUTC = new Date();

      // Get the current time in Indian Standard Time (IST)
      const now = new Date(nowUTC.getTime() + (5.5 * 60 * 60 * 1000)); // IST is UTC+5.5

    console.log(now);
    // Find scheduled messages where the scheduled timestamp is before or equal to the current time
    const scheduledMessages = await Schedule.find({
      'data.scheduletimestamp': { $lte: now }
    });
    console.log(scheduledMessages)
    // Iterate through each scheduled message
    for (const message of scheduledMessages) {
      const { phonenumber, text, scheduletimestamp } = message.data;

      // Log the scheduled time
      console.log("Scheduled time reached:", scheduletimestamp);

      // Send the message using your bot implementation
      // await bot.sendMessage(phonenumber, text);
      console.log("phonenumber: " + phonenumber, "text" + text);

      // Update the timestamp to mark it as sent
      message.data.timestamp = new Date();

      // Save the updated message
      await message.save();

      // Log the text
      console.log('Scheduled message sent:', text);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // Schedule the next check after a certain interval (e.g., every minute)
  setTimeout(scheduleAndSendMessages, 60000); // Check every minute
}

// Call the function to start checking for scheduled messages
scheduleAndSendMessages();


