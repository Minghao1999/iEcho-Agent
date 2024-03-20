// Import necessary modules
import { validationResult } from "express-validator";
import { createBot } from "whatsapp-cloud-api";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define constants from environment variables
const from = process.env.FROM;
const token = process.env.TOKEN;
const to = process.env.TO;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;

// Initialize the bot
const bot = createBot(from, token);

// Function to send WhatsApp message
export const sendmessage = async (request, response) => {
  try {
    const { phoneNumber, message } = request.body;

    // Validate request body
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    // Send WhatsApp message
    await bot.sendText(phoneNumber, message);

    return response.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

// Function to receive WhatsApp message
export const receivemessage = async (request, response) => {
  try {
    // Verify webhook token
    const { body } = request;
    if (body.webhookVerifyToken !== webhookVerifyToken) {
      return response.status(403).json({ error: "Unauthorized" });
    }

    // Handle incoming message
    const receivedMessage = body.message;
    console.log("Received message:", receivedMessage);

    // Your logic to handle the received message

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Error receiving message:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};
