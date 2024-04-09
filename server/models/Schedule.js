import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
    phonenumber: {
        type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
        ref: 'Contact' // Specify the model that this field refers to
    },
    data: [{
        scheduletimestamp: { 
            type: String, 
        },
        text: {
            type: String
        },
        timestamp: { 
            type: Date, 
            default: Date.now 
        }
    }]
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;
