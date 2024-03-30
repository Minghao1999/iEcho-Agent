import OpenAI from "openai";
import dotnet from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmCategory,HarmBlockThreshold } from "@google/generative-ai";
dotnet.config();
// OpenAI configuration
export const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION || "",
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

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

// Gemini configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const genAIModel = genAI.getGenerativeModel({
  model: "gemini-pro",
});

export const conversation = [
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
