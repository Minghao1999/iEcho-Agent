import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SideLogo from "../components/sideLogo";

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
    <div className="login">
      <SideLogo />

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>
        <div className="login-instead">
          <p>
            Already have an account?{" "}
            <Link to={"/login"}>
              <button className="button">Login Here</button>
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
