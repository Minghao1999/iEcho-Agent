import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    phonenumber: {
        type: String
    },
    name: {
        type: String
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
