import React, { useState, ChangeEvent, FormEvent } from "react";
import { InquiryData, MessageResponse } from "../../types/api";
import { useInquiryMutation } from "../../redux/api/userAPI";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import classes from '../UI/inquiry/inquiry.module.css'
import {Ellipse8Icon} from "../UI/feature/Ellipse8Icon.tsx";
import {Ellipse9Icon} from "../UI/feature/Ellipse9Icon.tsx";

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
      <div className={`${classes.root}`}>
          <div className={classes.rectangle21}></div>
          <div className={classes.requestDemo}>Request</div>
          <div className={classes.ellipse8}>
              <Ellipse8Icon className={classes.icon}/>
          </div>
          <div className={classes.ellipse9}>
              <Ellipse9Icon className={classes.icon}/>
          </div>

          <form onSubmit={handleSubmit}>
              <div>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={classes.rectangle10}
                  />
                  <div className={classes.Name}>Name</div>
                  {formErrors.name && <span className="error">{formErrors.name}</span>}
              </div>
              <div>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={classes.rectangle102}
                  />
                  <div className={classes.emailAddress}>Email</div>
                  {formErrors.email && (
                      <span className="error">{formErrors.email}</span>
                  )}
              </div>
              <div>
                  <input
                      type="text"
                      id="phone"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className={classes.rectangle103}
                  />
                  <div className={classes.phone}>Phone</div>
                  {formErrors.phoneNumber && (
                      <span className="error">{formErrors.phoneNumber}</span>
                  )}
              </div>
              <div>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className={classes.rectangle104}
            ></textarea>
                  <div className={classes.message}>Message</div>
                  {formErrors.message && (
                      <span className="error">{formErrors.message}</span>
                  )}
              </div>
              <button type="submit" className={classes.rectangle12}>Submit</button>
          </form>
      </div>
  );
};

export default Inquiry;
