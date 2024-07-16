import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons

import { useNavigate, useParams } from "react-router-dom";
import SideLogo from "../components/sideLogo";
import { useResetMutation } from "../redux/api/userAPI";
import { MessageResponse } from "../types/api";
import {Ellipse3Icon} from "../components/UI/forgetPassword/Ellipse3Icon.tsx";
import {Ellipse4Icon} from "../components/UI/forgetPassword/Ellipse4Icon.tsx";
import {Ellipse5Icon} from "../components/UI/forgetPassword/Ellipse5Icon.tsx";
import classes from '../components/UI/resetPassword/resetPassword.module.css'

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams<{ token: string }>() || "";

  const [ResetPasswordReq] = useResetMutation();

  const navigator = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Token", token);

    if (password !== confirmPassword) {
      toast.error("Confirm Passwords do not match");
      return;
    }
    console.log(token);
    const res = await ResetPasswordReq({ verifyToken: token || "", password });

    if ("data" in res) {
      const message = res.data.message || "";
      toast.success(message, {
        duration: 4000,
      });
      localStorage.setItem("token", token || "");

      navigator("/login");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
    <div className={classes.root}>
      <main>
        <div className={classes.ellipse5}>
          <Ellipse5Icon className={classes.icon}/>
        </div>
        <div className={classes.ellipse4}>
          <Ellipse4Icon className={classes.icon2}/>
        </div>
        <div className={classes.ellipse3}>
          <Ellipse3Icon className={classes.icon3}/>
        </div>
        <div className={classes.rectangle8}>
          <div className={classes.rectangle9}></div>
          <div className={classes.image2}></div>
          <div className={classes.signIn}>Reset Password</div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.rectangle10}
              />
              <div className={classes.password1}>New Password</div>
              <button
                  type="button"
                  className={classes.togglePassword}
                  onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
              </button>
            </div>

            <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={classes.rectangle101}
            />
            <div className={classes.password2}>Confirm Password</div>
            <br/>
            <button type="submit" className={classes.rectangle11}>Reset Password</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
