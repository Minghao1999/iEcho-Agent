import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/userAPI";
import { setUser } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";
import { LoginResponse, MessageResponse } from "../types/api";

import SideLogo from "../components/sideLogo";


const Login: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Login] = useLoginMutation();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User", user);
    const res = await Login({ phone, password });

    if ("data" in res) {
      const message = (res.data as LoginResponse).message || "";
      toast.success(message);
      dispatch(setUser({ user: res.data.data.user }));

      console.log("User", user);

      localStorage.setItem("token", res.data.data.token);
      navigator("/");
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
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
            <br />
            <button type="submit">Login</button>
          </form>
          <div className="forgot-account">
          <p>
            Forgot account? 
            <Link to={"/forgot"}>
              <button className="button"> Click Here</button>
            </Link>
          </p>
        </div>
        </main>

      </div>
  );
};

export default Login;
