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

// export const forgotPassword = async (req, res) => {
//     if (req.body?.email) {
//       let secret = Math.random().toString(16);
//       secret = secret.replace("0.", "");
//       let response = null;
//       try {
//         response = await user.forgotRequest(req.body, secret);
//       } catch (err) {
//         if (err?.status === 422) {
//           res.status(422).json({
//             status: 422,
//             message: "Email wrong",
//           });
//         } else {
//           res.status(500).json({
//             status: 500,
//             message: err,
//           });
//         }
//       } finally {
//         if (response) {
//           fs.readFile(
//             `${path.resolve(path.dirname(""))}/mail/template.html`,
//             "utf8",
//             (err, html) => {
//               if (!err) {
//                 html = html.replace(
//                   "[URL]",
//                   `${process.env.SITE_URL}:${process.env.SITE_PORT}/forgot/set/${response._id}/${response.secret}`
//                 );
//                 html = html.replace("[TITLE]", "Reset password");
//                 html = html.replace(
//                   "[CONTENT]",
//                   "A password change has been requested for your account. If this was you, please use the link below to reset your password."
//                 );
//                 html = html.replace("[BTN_NAME]", "Reset password");
  
//                 sendMail({
//                   to: req.body.email,
//                   subject: `Change password for BayesChat Account`,
//                   html,
//                 });
//               } else {
//                 console.log(err);
//               }
//             }
//           );
  
//           res.status(200).json({
//             status: 200,
//             message: "Success",
//           });
//         }
//       }
//     } else {
//       res.status(422).json({
//         status: 422,
//         message: "Email wrong",
//       });
//     }
// };
  
// export const forgotVerify = async (req, res) => {
//     if (req.query?.userId && req.query?.secret) {
//       let response = null;
//       try {
//         response = await user.checkForgot(req.query);
//       } catch (err) {
//         if (err?.status === 404) {
//           res.status(404).json({
//             status: 404,
//             message: "Wrong Verification",
//           });
//         } else {
//           res.status(500).json({
//             status: 500,
//             message: err,
//           });
//         }
//       } finally {
//         if (response) {
//           res.status(200).json({
//             status: 200,
//             message: "Success",
//           });
//         }
//       }
//     } else {
//       res.status(404).json({
//         status: 404,
//         message: "Wrong Verification",
//       });
//     }
//   };
  
// export const resetPassword = async (req, res) => {
//     if (req.body?.userId && req.body?.secret) {
//       if (
//         req.body?.newPass?.length >= 8 &&
//         req.body?.reEnter &&
//         req.body?.newPass === req.body?.reEnter
//       ) {
//         let response = null;
//         try {
//           response = await user.resetPassword(req.body);
//         } catch (err) {
//           if (err?.status === 404) {
//             res.status(404).json({
//               status: 404,
//               message: "Wrong Verification",
//             });
//           } else {
//             res.status(500).json({
//               status: 500,
//               message: err,
//             });
//           }
//         } finally {
//           if (response) {
//             res.status(200).json({
//               status: 200,
//               message: "Success",
//             });
//           }
//         }
//       } else {
//         res.status(422).json({
//           status: 422,
//           message:
//             "Password must 8 character and New password and Re Enter password must same",
//         });
//       }
//     } else {
//       res.status(404).json({
//         status: 404,
//         message: "Wrong Verification",
//       });
//     }
//   };

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({
      status: 200,
      message: "LogOut",
    });
  };