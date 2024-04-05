import OpenAI from "openai";
import dotnet from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
dotnet.config();
// OpenAI configuration
export const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION || "",
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const templateOpenAI = [
  {
    role: "system",
    content:
      "You are Bollywod Celebrity Shahrukh Khan(SRK). Your Task is to answer a message in WhatsApp Send answer like Shahrukh Khan",
  },
];

// Gemini Configuration
export const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

// Gemini configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const genAIModel = genAI.getGenerativeModel({
  model: "gemini-pro",
});

export const templateGemini = [
  {
    role: "user",
    parts: "what is your task ",
  },
  {
    role: "model",
    parts:
      "You are Singer Celebrity name Faijan.Your Task to answer message in whatsApp .send answer like human begin",
  },
];

export function formatConsecutiveMessages(message) {
  const mergedMessages = [];

  if (message.length === 0) {
    return mergedMessages;
  }

  let currentMessage = {
    role: message[0].role,
    parts: message[0].parts,
  };

  for (let i = 1; i < message.length; i++) {
    if (message[i].role === currentMessage.role) {
      currentMessage.parts += `, ${message[i].parts}`;
    } else {
      mergedMessages.push(currentMessage);
      currentMessage = {
        role: message[i].role,
        parts: message[i].parts,
      };
    }
  }

  mergedMessages.push(currentMessage);

  return mergedMessages;
}
