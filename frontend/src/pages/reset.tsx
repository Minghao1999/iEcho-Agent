import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons

import { useNavigate, useParams } from "react-router-dom";
import SideLogo from "../components/sideLogo";
import { useResetMutation } from "../redux/api/userAPI";
import { MessageResponse } from "../types/api";

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
    <div className="login">
      <SideLogo />
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">New Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button type="submit">Reset Password</button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
