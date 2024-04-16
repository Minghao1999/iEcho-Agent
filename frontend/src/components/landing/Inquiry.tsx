import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineMessage,
} from "react-icons/ai";
import { InquiryData, MessageResponse } from "../../types/api";
import { useInquiryMutation } from "../../redux/api/userAPI";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const Inquiry: React.FC = () => {
  const [formData, setFormData] = useState<InquiryData>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<InquiryData>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [Inquiry] = useInquiryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: Partial<InquiryData> = {};
    // Simple validation for required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof InquiryData]) {
        errors[key as keyof InquiryData] = "This field is required";
      }
    });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission logic
      console.log(formData);
    }

    e.preventDefault();
    const res = await Inquiry(formData);

    if ("data" in res) {
      const message = (res.data as MessageResponse).message || "";
      toast.success(message, {
        duration: 3000,
      });
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message || "";
      toast.error(message);
    }
  };

  return (
    <div className="inquiry-form">
      <h2>Demo Inquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <AiOutlineUser className="icon" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </div>
        <div className="form-group">
          <AiOutlineMail className="icon" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </div>
        <div className="form-group">
          <AiOutlinePhone className="icon" />
          <input
            type="text"
            id="phone"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {formErrors.phoneNumber && (
            <span className="error">{formErrors.phoneNumber}</span>
          )}
        </div>
        <div className="form-group">
          <AiOutlineMessage className="icon" />
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          {formErrors.message && (
            <span className="error">{formErrors.message}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Inquiry;
