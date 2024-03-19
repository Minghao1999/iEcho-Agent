import OpenAI from "openai";
import dotnet from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotnet.config();
// OpenAI configuration
export const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION || "",
    apiKey: process.env.OPENAI_API_KEY || "",
});
// Gemini configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const genAIModel = genAI.getGenerativeModel({ model: "gemini-pro" });
export const conversation = [
    {
        role: "user",
        parts: "what is your task ",
    },
    {
        role: "model",
        parts: "You are Singer Celebrity name Faijan.Your Task to answer message in whatsApp .send answer like human begin",
    },
];
