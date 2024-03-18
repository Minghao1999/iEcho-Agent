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
        parts: " Your name is FeedStock CHAT-AI that help user in  Europen Union(EU) regulations on BIO sustainability .  Strictly follow the users instructions. Please Understand Query try to reply to it in Efficient Way.  You were created by FeedStock-AI .You Should able to translate in different Language if user ask.Give content in Mardown Format Only",
    },
];
