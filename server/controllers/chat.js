import { TryCatch } from "../middlewares/error.js";
import { conversation, genAIModel } from "../utils/chatAI.js";
import ErrorHandler from "../utils/utitlity.js";
import { Chat } from "../models/chat.js";
export const newChat = TryCatch(async (req, res, next) => {
    const { prompt, userId } = req.body;
    console.log(prompt);
    if (!prompt)
        return next(new ErrorHandler("Please add your prompt", 400));
    const chatSession = genAIModel.startChat({
        history: conversation,
    });
    const result = await chatSession.sendMessage(prompt);
    if (!result)
        return next(new ErrorHandler("couldn't receive message from model", 500));
    const messageResponse = result.response.text();
    // Check if a Chat document already exists for the given user
    const existingChat = await Chat.findOne({ user: userId });
    let chatId;
    if (existingChat) {
        // Update the existing Chat document
        existingChat.data.push({
            chats: [
                conversation[0],
                conversation[1],
                { role: "user", parts: prompt },
                { role: "model", parts: messageResponse },
            ],
        });
        await existingChat.save();
        chatId = existingChat._id; // Using existing chatId
        return res.status(200).json({
            success: true,
            message: "NewChat was successfully created",
            data: {
                chatId: chatId,
                content: messageResponse,
            },
        });
    }
    else {
        // Create a new Chat document
        const newChat = new Chat({
            user: userId,
            data: [
                {
                    chats: [
                        conversation[0],
                        conversation[1],
                        { role: "user", parts: prompt },
                        { role: "model", parts: messageResponse },
                    ],
                },
            ],
        });
        // Save the new chat document to the database
        await newChat.save();
        const lastIndex = newChat.data.length - 1;
        console.log(lastIndex);
        chatId = newChat.data[0].chatId;
        console.log("New ChatID", chatId);
        return res.status(200).json({
            status: 200,
            message: "New Chat added",
            data: {
                chatId: chatId,
                content: messageResponse,
            },
        });
    }
});
// Endpoint to add a new chat to the existing conversation
export const addChat = TryCatch(async (req, res, next) => {
    const { chatId, prompt, userId } = req.body;
    console.log("ADD", chatId, prompt, userId);
    if (!chatId || !prompt)
        return next(new ErrorHandler("Please provide all details", 404));
    console.log(chatId, prompt, userId);
    // Find the chat document by both chatId and userId
    let chat = await Chat.findOne({ "data.chatId": chatId, user: userId });
    if (!chat)
        return next(new ErrorHandler("Chat not found", 404));
    // Start a new chat session
    const chatSession = genAIModel.startChat({
        history: chat.data[0].chats,
    });
    // Send the prompt to the chat model
    const result = await chatSession.sendMessage(prompt);
    if (!result) {
        return next(new ErrorHandler("Couldn't receive message from model", 500));
    }
    // Get the model's response
    const messageResponse = result.response.text();
    // Add the new chat to the existing conversation
    chat.data[0].chats.push({ role: "user", parts: prompt });
    chat.data[0].chats.push({ role: "model", parts: messageResponse });
    // Save the updated chat document
    chat = await chat.save();
    return res.status(200).json({
        status: 200,
        message: "Chat added successfully",
        data: {
            content: messageResponse,
        },
    });
});
// Endpoint to get all chats for a given user
export const getAllChats = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
    // Find all chat documents for the given user
    const chats = await Chat.find({ user: userId });
    if (!chats)
        return next(new ErrorHandler("Chats not found", 404));
    const dataArrays = chats.map((chat) => chat.data);
    return res.status(200).json({
        status: 200,
        message: "Success",
        data: {
            chats: dataArrays,
        },
    });
});
// get chat by chatId
export const getChatById = TryCatch(async (req, res, next) => {
    const { chatId, userId } = req.body;
    // Find the chat document by chatId
    const chat = await Chat.findOne({ "data.chatId": chatId, user: userId }, // Query condition
    { "data.$": 1 } // Projection to return only the matched element of the data array
    );
    if (!chat)
        return next(new ErrorHandler("Chat not found", 404));
    return res.status(200).json({
        status: 200,
        message: "Success",
        data: chat?.data[0], // Access the first element of the data array
    });
});
export const deleteChatById = TryCatch(async (req, res, next) => {
    const { chatId, userId } = req.body;
    const deletedChat = await Chat.updateOne({ user: userId.toString() }, { $pull: { data: { chatId: chatId } } });
    if (!deletedChat) {
        return next(new ErrorHandler("Chat not found", 404));
    }
    return res.status(200).json({
        status: 200,
        message: "Chat deleted successfully",
        data: deletedChat,
    });
});
