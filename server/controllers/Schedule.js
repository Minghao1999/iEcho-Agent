import Contact from "../models/Contact.js";
import Message from "../models/Message.js";
import Schedule from "../models/Schedule.js";
import moment from "moment-timezone";
import { bot } from "../whatsCloud.js";

// Set the time zone to India Standard Time (IST)
moment.tz.setDefault("Asia/Kolkata");

export async function scheduleAndSendMessages() {
  try {
    const now = moment();

    // Get the current time in IST
    const hours = now.hours();
    const minutes = now.minutes();

    const hoursandminutes = `${hours}:${minutes}`;
    console.log("hoursandminutes time: " + hoursandminutes);

    // Find scheduled messages where the scheduled timestamp is equal to the current time
    const scheduledMessages = await Schedule.find({
      scheduletimestamp: { $eq: hoursandminutes }, // Use $eq for exact match
    });

    // Iterate through each scheduled message
    for (const message of scheduledMessages) {
      const { text } = message;
      console.log("scheduledMessages: " + text);

      const contacts = await Contact.find(); // Retrieve all contacts

      for (const contact of contacts) {
        // Assuming phonenumber is stored in each contact document
        const { phonenumber } = contact;
        console.log("phonenumber: " + phonenumber);
        // Send message to each contact
        bot.sendMessage(phonenumber, text);

        let message = await Message.findOne({ phonenumber: contact._id });

        // If the message document doesn't exist, create a new one
        if (!message) {
          message = new Message({
            phonenumber: contact._id,
            data: [{ sender: "me", text: text, type: "text" }],
          });
        } else {
          // If the message document exists, update it by pushing the new message data
          message.data.push({ sender: "me", text: text, type: "text" });
        }

        await message.save();
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // Schedule the next check after a certain interval (e.g., every minute)
  setTimeout(scheduleAndSendMessages, 60000); // Check every minute
}
