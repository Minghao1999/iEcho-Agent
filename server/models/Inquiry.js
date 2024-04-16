import mongoose from 'mongoose';

const { Schema } = mongoose;

const InquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

export default Inquiry;
