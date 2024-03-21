import { TryCatch } from "../middlewares/error.js";
import { genAIModel } from "../utils/chatAI.js";
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
export const handleMessage = TryCatch(async (msg) => {
  console.log(msg);
  const { from, data, name } = mes;

  //   let contact = await Contact.findOne({ phonenumber: from });

  //   if (!contact) {
  //     contact = new Contact({ phonenumber:from, name, setting });
  //     await contact.save();
  //   }

  //   let message = await Message.findOne({ phonenumber: contact._id });

  //   // If the message document doesn't exist, create a new one
  //   if (!message) {
  //       message = new Message({
  //           phonenumber: contact._id,
  //           data: [{ sender, text, type }]
  //       });
  //   } else {
  //       // If the message document exists, update it by pushing the new message data
  //       message.data.push({ sender, text, type });
  //   }

  //   await message.save();

  const prompt = msg.data.text;
  let conversation = template;

  const chatSession = genAIModel.startChat({
    history: conversation,
  });

  conversation.push({ role: "user", parts: prompt });

  const result = await chatSession.sendMessage(prompt);
  const messageResponse = result.response.text();
  await bot.sendText(msg.from, messageResponse);

  conversation.push({ role: "model", parts: messageResponse });
  console.log(conversation);
});
