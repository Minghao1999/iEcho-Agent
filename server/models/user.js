import mongoose, { Schema } from "mongoose";

const actualUserSchema = new Schema({
    email: { type: String, required: [true, "Please Enter Email"], unique: true },
    password: { type: String, required: [true, "Please Enter Password"] },
    firstname: { type: String, required: [true, "Please enter First Name"] },
    lastname: { type: String, required: [true, "Please enter Last Name"] },
    phone: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const User = mongoose.model("User", actualUserSchema);
