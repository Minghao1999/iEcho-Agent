import { PendingUser, User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utitlity.js";
import { generateToken } from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../mail/send.js";

export const Login = async (req, res, next) => {
  const { phone, password } = req.body;
  // Check if phone and password are provided
  if (!phone || !password) {
    return next(new ErrorHandler("Please provide phone and password", 400));
  }
  // Find user by phone
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
      message: `Welcome ${user.firstname}`,
      data: { token: token, user: user },
    });
};

export const getUser = TryCatch(async (req, res, next) => {
  // Extract user ID from request parameters
  const { userId } = req.body;

  // Find user by ID in the database
  const user = await User.findById(userId);

  // If user not found, throw an error
  if (!user) next(new ErrorHandler("User not found", 404));

  // If user found, return user data
  res
    .status(200)
    .json({
      success: true,
      message: "Login successful using Token",
      data: user,
    });
});

export const completeUser = TryCatch(async (req, res, next) => {
  const { firstname, lastname, password, phone, email } = req.body;
  
  // Find pending user by verification token
  if (!firstname || !lastname || !phone || !email || !password) {
    return next(new ErrorHandler("Please give all required parameters", 400));
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return next(new ErrorHandler("User with this email already exists", 409));
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create actual user from pending user data
  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone: phone,
  });
  // Save actual user to database
  await user.save();

  // Send token in response
  return res.status(201).json({
    success: true,
    message: "Account setup completed successfully.",
    data: { user: user },
  });
});

export const ForgotRequest = TryCatch(async (req, res, next) => {
  const { email } = req.body;

  console.log("Email ", email);
  if (!email) return next(new ErrorHandler("Please Enter Email", 400));

  // Find user by email
  const user = await User.findOne({ email });

  // If user not found, send error message
  if (!user) return next(new ErrorHandler("User Not Found", 400));

  // Find user by email
  const pending = await PendingUser.findOne({ email });

  // If pending found, send error message
  if (pending)
    return next(
      new ErrorHandler("Already Email sent  Please Check Your Email", 400)
    );

  const verificationToken = generateToken({ email });

  const pendingUser = new PendingUser({
    email,
    verificationToken,
  });

  await pendingUser.save();

  console.log("Verification Token ", verificationToken);

  // Send verification email
  sendVerificationEmail(email, verificationToken);

  return res.status(200).json({
    success: true,
    message: `Forgot Request successful. Please Check your email to change password : ${user.email} `,
  });
});

export const ResetPassword = TryCatch(async (req, res, next) => {
  const { verifyToken, password } = req.body;

  if (!verifyToken || !password) {
    return next(
      new ErrorHandler(
        "Invalid Request. Please provide token and new password",
        400
      )
    );
  }

  const pending = await PendingUser.findOne({ verificationToken: verifyToken });

  if (!pending) {
    return next(new ErrorHandler("Unable to find pending user", 400));
  }

  const user = await User.findOne({ email: pending.email });

  if (!user) {
    return next(new ErrorHandler("User not found. Please sign up", 401));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user's password
  user.password = hashedPassword;
  await user.save();

  // Remove the pending user entry
  await PendingUser.deleteOne({ _id: pending._id });

  // Create JWT token
  const token = generateToken({ email: user.email, userId: String(user._id) });

  // Send token in response
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Password reset successful",
      token: token,
    });
});

export const getProfile = async (request, response) => {
  try {
    // Assuming you have some way to identify the user, such as their email or ID
    const { phonenumber } = request.body;
    // Retrieve the user profile information from the database
    const userProfile = await User.findOne({ phone: phonenumber });

    if (!userProfile) {
      return response
        .status(404)
        .json({ success: false, message: "User profile not found" });
    }

    // If the user profile exists, return it in the response
    response.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    response.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (request, response) => {
  try {
    // Extract the phone number from the request parameters
    const { phonenumber } = request.body;

    // Retrieve the user by phone number
    const user = await User.findOne({ phone: phonenumber });

    // If the user is not found, return a 404 Not Found response
    if (!user) {
      return response
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the user's profile information based on the request body
    user.firstname = request.body.firstname || user.firstname;
    user.lastname = request.body.lastname || user.lastname;
    user.email = request.body.email || user.email;

    // Save the updated user profile
    await user.save();

    // Return a success response
    response.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    response.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "LogOut",
  });
};
