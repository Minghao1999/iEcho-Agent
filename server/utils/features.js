import mongoose from "mongoose";

export const connectDB = async (MongoDB_URL) => {
    try {
        await mongoose.connect(MongoDB_URL);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
    }
};
