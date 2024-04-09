import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  scheduletimestamp: {
    type: String,
  },
  text: {
    type: String,
  },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
