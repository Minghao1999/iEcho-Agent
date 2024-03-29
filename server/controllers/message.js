import { TryCatch } from "../middlewares/error.js";
import Contact from "../models/Contact.js";
import Message from "../models/Message.js";
import { bot } from "../whatsCloud.js";

export const newMessage = async (request, response) => {
    const { phonenumber, name, sender, text, type,setting } = request.body;

    try {
        // Check if the contact exists
        let contact = await Contact.findOne({ phonenumber });
        // If the contact doesn't exist, insert it into the Contact collection
        if (!contact) {
            contact = new Contact({ phonenumber, name,setting });
            await contact.save();
        }

        // Find or create the message document
        let message = await Message.findOne({ phonenumber: contact._id });

        bot.sendMessage(phonenumber, text)

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
        // Retrieve the contact based on the phone number
        const contact = await Contact.findOne({ phonenumber: request.params.id });

        if (!contact) {
            // If the contact doesn't exist, return an empty array
            return response.status(200).json([]);
        }

        // Retrieve messages associated with the contact's ObjectId
        const messages = await Message.find({ phonenumber: contact._id }).populate('phonenumber');

        // Manipulate the response format
        const formattedMessages = messages.map(message => ({
            _id: message._id,
            phonenumber: message.phonenumber.phonenumber,
            phonenumberobject: message.phonenumber._id,
            data: message.data
        }));

        response.status(200).json(formattedMessages);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getContact = async (request, response) => {
    try {
        // Retrieve all contacts
        const contacts = await Contact.find();

        // Iterate through each contact
        for (const contact of contacts) {
            // Find the last message associated with the contact
            const lastMessage = await Message.findOne(
              { phonenumber: contact._id },
              { "data": { $slice: -1 } }
            );

            // Set the lastmessage field of the contact object
            contact.lastmessage = lastMessage ? lastMessage.data[0].text : ""; 
        }

        // Send the formatted contacts array in the response
        response.status(200).json({
            success: true,
            message: "Contacts with last message retrieved successfully",
            data: contacts.map(contact => ({
                _id: contact._id.toString(),
                phonenumber: contact.phonenumber,
                name: contact.name,
                lastmessage: contact.lastmessage,
                setting:contact.setting
            }))
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Failed to retrieve contacts with last message",
            error: error.message // Include the error message in the response
        });
    }
};

export const putSetting = TryCatch(async (req, res) => {
    const { phonenumber,setting } = req.body;
  
    try {
      // Find the contact by phone number
      const contact = await Contact.findOne({ phonenumber });
  
      // If the contact doesn't exist, return a 404 Not Found error
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }
  
      // Update the setting for the contact
      contact.setting = setting;
      await contact.save();
  
      // Return a success response
      res.status(200).json({ success: true, message: 'Setting updated successfully' });
    } catch (error) {
      // If an error occurs, return a 500 Internal Server Error
      res.status(500).json({ success: false, message: error.message });
    }
  });