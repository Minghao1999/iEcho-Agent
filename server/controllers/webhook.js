import Message from "../models/Message.js";
import Contact from "../models/Contact.js";
import { TryCatch } from "../middlewares/error.js";
import {openai,
  formatConsecutiveMessages,
  genAIModel,
  generationConfig,
  safetySettings,
  templateGemini,
  templateOpenAI,
} from "../utils/chatAI.js";
import { bot } from "../whatsCloud.js";



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

  // OpenAI 
  message.data.push({ sender: "friend", type, text });
  await message.save();

  let historyMessages = [];
  if (message) {
    historyMessages = message.data.map((item) => ({
      role: item.sender === "me" ? "assistant" : "user",
      content: item.text,
    }));
  }

  const conversation = [...templateOpenAI, ...historyMessages];

  const response = await openai.chat.completions.create({
    model: process.env.FINE_TUNE_MODEL,
    messages: conversation,
    temperature: 1,
  });

  const messageResponse = response.choices[0]?.message?.content;

  // Gemini Message
  // if (message) {
  //   historyMessages = message.data.map((item) => ({
  //     role: item.sender === "me" ? "model" : "user",
  //     parts: item.text,
  //   }));
  // }
  // const conversation = [...templateGemini, ...historyMessages];
  // const formattedMessages = formatConsecutiveMessages(conversation);

  // const chatSession = genAIModel.startChat({
  //   history: formattedMessages,
  //   generationConfig,
  //   safetySettings,
  // });

  // const result = await chatSession.sendMessage(text);
  // const messageResponse = result.response.text();
  // message.data.push({ sender: "friend", type, text });
  // await message.save();

  await bot.sendText(from, messageResponse);



  message.data.push({ sender: "me", text: messageResponse, type });
  io.emit("bot-message", {
    data: message.data[message.data.length - 1],
    phonenumber: contact.phonenumber,
  });

  await message.save();
});
