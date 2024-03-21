import {genAIModel} from "../utils/chatAI.js"
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
export const handleMessage = async (msg) => {
    console.log(msg);
    const prompt = msg.data.text;
    let conversation = template
  
    const chatSession = genAIModel.startChat({
      history: conversation,
    });
  
    conversation.push({ role: "user", parts: prompt });
  
    const result = await chatSession.sendMessage(prompt);
    const messageResponse = result.response.text();
    await bot.sendText(msg.from, messageResponse);
  
    conversation.push({ role: "model", parts: messageResponse });
    console.log(conversation);
  };