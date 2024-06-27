import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {Ellipse3Icon} from "../components/UI/signUp/Ellipse3Icon.tsx";
import {Ellipse4Icon} from "../components/UI/signUp/Ellipse4Icon.tsx";
import {Ellipse5Icon} from "../components/UI/signUp/Ellipse5Icon.tsx";
import classes from '../components/UI/signUp/signUp.module.css'

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    phone: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [Signup] = useSignupMutation();
  const navigator = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await Signup(formData);

    if ("data" in res) {
      toast.success("Signup successful! Please Login to Continue");
      navigator("/login");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
      <div className={classes.root}>
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
        <div className={classes.signUp1}>Sign Up</div>
        <div className={classes.frame3}>
        <main>
          <form onSubmit={handleSubmit}>
            <div className={classes.group6}>
              <div className={classes.firstname}>FirstName</div>
              <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={classes.rectangle10}
              />
            </div>
            <div className={classes.group5}>
              <div className={classes.lastname}>LastName</div>
              <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={classes.rectangle102}
              />
            </div>
            <div className={classes.group1}>
              <div className={classes.password}>Password</div>
              <div className="password-input">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={classes.rectangle103}
                />
                <button
                    type="button"
                    className={classes.togglePassword}
                    onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                </button>
              </div>
            </div>

              <div className={classes.phone}>Phone</div>
              <input
                  type="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={classes.rectangle104}
              />
            <div className={classes.email}>Email</div>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={classes.rectangle105}
            />

            <div>
              <button type="submit" className={classes.rectangle12}>Sign Up</button>
            </div>
          </form>
          <div className="forgot-account">
            <Link to={"/login"} className={classes.cancel}>
            Already have an account
              </Link>
          </div>
        </main>
        </div>
      </div>
  );
};

export default Signup;
