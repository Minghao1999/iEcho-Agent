import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForgotMutation } from "../redux/api/userAPI";
import { setUser } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";
import { LoginResponse, MessageResponse } from "../types/api";
import {Ellipse3Icon} from "../components/UI/forgetPassword/Ellipse3Icon.tsx";
import {Ellipse4Icon} from "../components/UI/forgetPassword/Ellipse4Icon.tsx";
import {Ellipse5Icon} from "../components/UI/forgetPassword/Ellipse5Icon.tsx";
import classes from '../components/UI/forgetPassword/forget.module.css'


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
          <div className={classes.rectangle8}></div>
          <div className={classes.rectangle9}></div>
          <div className={classes.image2}></div>
          <div className={classes.signIn}>Find your account</div>
          <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.rectangle10}
            />
            <div className={classes.username}>Email</div>
            <br/>
            <button type="submit" className={classes.rectangle11}>Search</button>
          </form>
          <div>
            <Link to={"/login"}>
                <button className={classes.rectangle12}>Cancel</button>
              </Link>
          </div>
        </main>

      </div>
  );
};

export default Login;
