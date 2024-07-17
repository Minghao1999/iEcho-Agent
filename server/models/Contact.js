import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    phonenumber: {
        type: String
    },
    name: {
        type: String
    },
    setting: {
        type: String,
        enum: ['auto', 'manual'],
        default: 'auto'
    }
    userId:

});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
