import mongoose, { Schema } from "mongoose";
// PendingUser Schema
const pendingUserSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId().toHexString(),
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verificationToken: String,
});
// ActualUser Schema
const actualUserSchema = new Schema({
    email: { type: String, required: [true, "Please Enter Email"], unique: true },
    password: { type: String, required: [true, "Please Enter Password"] },
    role: {
        type: String,
        enum: ["supplier", "buyer", "auditor", "user"],
        default: "user",
    },
    firstname: { type: String, required: [true, "Please enter First Name"] },
    lastname: { type: String, required: [true, "Please enter Last Name"] },
    street: { type: String, default: "" },
    apartment: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    postcode: { type: String, default: "" },
    phone: { type: String, default: "" },
    mobile: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const User = mongoose.model("User", actualUserSchema);
export const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
