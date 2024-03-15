import express from "express";
import dotenv from "dotenv";
import axios from "axios"; // Import Axios for making HTTP requests
import { genAIModel } from "./chatAI.js";

dotenv.config();

const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN || "";
const PhoneNumberID = process.env.PhoneNumberID || ""; 


// Define a simple GET endpoint
app.get("/", (req, res) => {
  return res.send("Hello, this is a simple GET API!");
});

app.use(express.json());

app.post("/api/messages", async (req, res, next) => {
  try {
    const { prompt, received_number } = req.body;


    // Repose the message
    const chatSession = genAIModel.startChat({
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const messageResponse = result.response.text();

    // Your Facebook Graph API endpoint
    const facebookAPIEndpoint = `https://graph.facebook.com/v18.0/${PhoneNumberID}/messages`;

    // Construct the request body
    const requestBody = {
      recipient_type: "individual",
      messaging_product: "whatsapp",
      to: received_number,
      type: "text",
      text: {
        preview_url: false,
        body: messageResponse,
      },
    };

    // Make the POST request to Facebook Graph API using Axios
    const response = await axios.post(facebookAPIEndpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${FACEBOOK_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (response.status !== 200) {
      throw new Error("Failed to send message to Facebook Graph API");
    }

    const responseData = response.data;

    return res.status(200).json({
      status: 200,
      message: "Chat Response",
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
});
