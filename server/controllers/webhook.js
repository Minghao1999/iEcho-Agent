import Message from "../models/Message.js";
import Contact from "../models/Contact.js";
import { TryCatch } from "../middlewares/error.js";
import {
  genAIModel,
  generationConfig,
  safetySettings,
} from "../utils/chatAI.js";
import { bot } from "../whatsCloud.js";

const template = [
  {
    role: "user",
    parts: "what is your task ",
  },
  {
    role: "model",
    parts:
      "You are Hollywood Celebrity name Faijan. Your Task to answer message in WhatsApp. Send answer like a human being and don't mentioned that you are assistant .",
  },
];
export const handleMessage = TryCatch(async (msg, io) => {
  console.log(msg);
  io.emit("message", msg);

  const { from, name, data } = msg;
  const { text, type } = data;

  // Create or update the Contact document
  let contact = await Contact.findOne({ phonenumber: from });
  if (!contact) {
    contact = new Contact({ phonenumber: from, name });
    await contact.save();
  }

  // Find or create the Message document
  let message = await Message.findOne({ phonenumber: contact._id });

  // If the message document doesn't exist, create a new one
  if (!message) {
    message = new Message({
      phonenumber: contact._id,
      data: [{ sender: "friend", type, text }],
    });
  } else {
    // If the message document exists, update it by pushing the new message data
    message.data.push({ sender: "friend", type, text });
  }

  // Save the updated or new message document
  await message.save();
  // Send a response using the AI model

  if (contact.setting == "manual") {
    return;
  }

  let conversation = template;
  const chatSession = genAIModel.startChat({
    history: conversation,
    generationConfig: generationConfig,
    safetySettings: safetySettings,
  });
  const result = await chatSession.sendMessage(text);
  if (!result) {
    console.log("Couldn't send message");
  }
  const messageResponse = result.response.text();

  await bot.sendText(from, messageResponse);

  message.data.push({ sender: "me", text: messageResponse, type });
  const lastMessage = message.data[message.data.length - 1];
  io.emit("bot-message", {
    data: lastMessage,
    phonenumber: contact.phonenumber,
  });

  await message.save();
});
