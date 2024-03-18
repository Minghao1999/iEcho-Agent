import {  User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utitlity.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../mail/send.js";


export const Login = async (req, res, next) => {
    const { phone, password } = req.body;
    // Check if email and password are provided
    if (!phone || !password) {
        return next(new ErrorHandler("Please provide phone and password", 400));
    }
    // Find user by email
    const user = await User.findOne({ phone });
    // If user not found, throw error
   
    if (!user) {
      
        return next(new ErrorHandler("user not found please signup", 401));
    }
    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    // If passwords don't match, throw error
    if (!match) {
        return next(new ErrorHandler("Invalid phone or password", 401));
    }
    // Create JWT token
    const token = generateToken({ phone: phone, userId: String(user._id) });
    // Send token in response
    res
        .status(200)
        .cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
    })
        .json({
        success: true,
        message: "Login successful",
        data: { token: token, user: user },
    });
};
export const completeUser = TryCatch(async (req, res, next) => {
    const { firstname, lastname,password,phone,email} = req.body;
    // Find pending user by verification token
    if (!firstname || !lastname || !phone || !email || !password ) {
        return next(new ErrorHandler("Please give all required parameters", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create actual user from pending user data
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email:email,
        password: hashedPassword,
        phone: phone,
    });
    // Save actual user to database
    await user.save();
    
    // Send token in response
    return res
        .status(201)
        .json({
        success: true,
        message: "Account setup completed successfully.",
        data: { user: user },
    });
});