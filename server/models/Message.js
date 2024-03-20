import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    phonenumber: {
        type: String
    },
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
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
