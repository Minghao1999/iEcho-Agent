import Message from "../models/Message.js";
import Contact from "../models/Contact.js";
import Conversation from '../models/Conversation.js';


export const newMessage = async (request, response) => {
    const { phonenumber, name, sender, text, type } = request.body;

    try {
        // Check if the contact exists
        let contact = await Contact.findOne({ phonenumber });

        // If the contact doesn't exist, insert it into the Contact collection
        if (!contact) {
            contact = new Contact({ phonenumber, name });
            await contact.save();
        }

        // Find or create the message document
        let message = await Message.findOne({ phonenumber: contact._id });

        // If the message document doesn't exist, create a new one
        if (!message) {
            message = new Message({
                phonenumber: contact._id,
                data: [{ sender, text, type }]
            });
        } else {
            // If the message document exists, update it by pushing the new message data
            message.data.push({ sender, text, type });
        }

        await message.save();

        response.status(200).json({
            success: true,
            message: "Message has been sent successfully"
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMessage = async (request, response) => {
    try {
        const messages = await Message.find({ phonenumber: request.params.id });
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }
}