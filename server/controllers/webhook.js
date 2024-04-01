import Message from "../models/Message.js";
import Contact from "../models/Contact.js";
import { TryCatch } from "../middlewares/error.js";
import {
  formatConsecutiveMessages,
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
      "You are Hollywood Celebrity name Faijan Khan. Your Task to answer message in WhatsApp. Send answer like a human being and don't mention that you are an assistant.",
  },
];

export const handleMessage = TryCatch(async (msg, io) => {
  console.log(msg);
  io.emit("message", msg);

  const { from, name, data } = msg;
  const { text, type } = data;

  let contact = await Contact.findOne({ phonenumber: from }).exec();

  if (!contact) {
    contact = new Contact({ phonenumber: from, name });
    await contact.save();
  }

  let message = await Message.findOne({ phonenumber: contact._id }).exec();

  if (!message) {
    message = new Message({
      phonenumber: contact._id,
      data: [],
    });
  }

  if (contact.setting === "manual") {
    message.data.push({ sender: "friend", type, text });
    await message.save();
    return;
  }

  let historyMessages = [];
  if (message) {
    historyMessages = message.data.map((item) => ({
      role: item.sender === "me" ? "model" : "user",
      parts: item.text,
    }));
  }

  const conversation = [...template, ...historyMessages];
  const formattedMessages = formatConsecutiveMessages(conversation);

  const chatSession = genAIModel.startChat({
    history: formattedMessages,
    generationConfig,
    safetySettings,
  });

  const result = await chatSession.sendMessage(text);
  const messageResponse = result.response.text();

  await bot.sendText(from, messageResponse);

    message.data.push({ sender: "friend", type, text });
    await message.save();

  message.data.push({ sender: "me", text: messageResponse, type });
  io.emit("bot-message", {
    data: message.data[message.data.length - 1],
    phonenumber: contact.phonenumber,
  });

  await message.save();
});
