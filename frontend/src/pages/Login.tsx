import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import Eye icons
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/userAPI";
import { setUser } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";
import { LoginResponse, MessageResponse } from "../types/api";
import {Ellipse3Icon} from "../components/UI/login/Ellipse3Icon.tsx";
import {Ellipse4Icon} from "../components/UI/login/Ellipse4Icon.tsx";
import {Ellipse5Icon} from "../components/UI/login/Ellipse5Icon.tsx";
import classes from '../components/UI/login/login.module.css'

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
      toast.success(message, {
        duration: 4000,
      });
      dispatch(setUser({ user: res.data.data.user }));

      localStorage.setItem("token", res.data.data.token);
      navigator("/");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
      <div className={`${classes.root}`}>
        <div className={classes.ellipse5}>
          <Ellipse5Icon className={classes.icon}/>
        </div>
        <div className={classes.ellipse4}>
          <Ellipse4Icon className={classes.icon2}/>
        </div>
        <div className={classes.ellipse3}>
          <Ellipse3Icon className={classes.icon3}/>
        </div>
        <div className={classes.rectangle8}></div>
        <div className={classes.rectangle9}></div>
        <div className={classes.image2}></div>
        <div className={classes.signIn}>Sign In</div>
        <main>
          <form onSubmit={handleSubmit}>
            {/*<label htmlFor="phone">Phone</label>*/}
            <div>
              <input
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={classes.rectangle10}
              />
              <div className={classes.username}>Phone</div>
            </div>

            {/*<label htmlFor="password">Password</label>*/}
            <div>
              <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.rectangle102}
              />
              <div className={classes.password}>Password</div>
              <button
                  type="button"
                  className={classes.togglePassword}
                  onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
              </button>
            </div>
            <br/>
            <div>
            <button type="submit" className={classes.rectangle12}>Login</button>
            </div>
            </form>
          <div className="forgot-account">
            <p>
              <Link to={"/signup"} className={classes.signUp}> Sign Up
              </Link>
            </p>
            <p>
              <Link to={"/forgot"} className={classes.forgetPassword}> Forget Password
              </Link>
            </p>
          </div>
        </main>
      </div>
  );
};

export default Login;