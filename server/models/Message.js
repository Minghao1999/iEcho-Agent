import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    phonenumber: {
        type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
        ref: 'Contact' // Specify the model that this field refers to
    },
    userId:{
        type: mongoose.Schema.Types.
    },
    data: [{
        sender: {
            type: String
        },
        text: {
            type: String
        },
        type: {
            type: String
        },
        timestamp: { 
            type: Date, 
            default: Date.now 
        }
    }]
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
