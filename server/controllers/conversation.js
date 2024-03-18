import { TryCatch } from "../middlewares/error.js";
import { conversation, genAIModel } from "../utils/chatAI.js";
import ErrorHandler from "../utils/utitlity.js";
import { Chat } from "../models/chat.js";

// Endpoint to get all chats for a given user
export const newConversation = TryCatch(async (request, response) => {
  let senderId = request.body.senderId;
  let receiverId = request.body.receiverId;

  const exist = await Conversation.findOne({
    members: { $all: [receiverId, senderId] },
  });

  if (exist) {
    return next(new ErrorHandler("conversation already exists", 200));
  }
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  const savedConversation = await newConversation.save();

  if (!savedConversation)
    return next(new ErrorHandler("Error saving conversation", 500));

  return response.status(200).json(savedConversation);
});

export const getConversation = TryCatch(async (request, response) => {
  const conversation = await Conversation.findOne({
    members: { $all: [request.body.senderId, request.body.receiverId] },
  });
  if (!conversation) {
    return next(new ErrorHandler("Conversation not found", 404));
  }
  return response.status(200).json(conversation);
});
