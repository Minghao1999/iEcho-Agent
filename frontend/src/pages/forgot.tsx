import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForgotMutation } from "../redux/api/userAPI";
import { setUser } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";
import { LoginResponse, MessageResponse } from "../types/api";

import SideLogo from "../components/sideLogo";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");

  const [Forgot] = useForgotMutation();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User", user);
    const res = await Forgot({ email });

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <br />
            <button type="submit">Submit</button>
          </form>
          <div className="forgot-account">
          <p>
            Login ? 
            <Link to={"/login"}>
              <button className="button"> Click Here</button>
            </Link>
          </p>
        </div>
        </main>

      </div>
  );
};

export default Login;
