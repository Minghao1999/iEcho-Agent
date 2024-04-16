import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineMessage } from 'react-icons/ai';

import "../../styles/landing/_inquiry.scss";

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const Inquiry: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: Partial<FormData> = {};
        // Simple validation for required fields
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof FormData]) {
                errors[key as keyof FormData] = 'This field is required';
            }
        });
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Proceed with form submission logic
            console.log(formData);
        }
    };

    return (
        <div className="inquiry-form">
            <h2>Demo Inquiry Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <AiOutlineUser className="icon" />
                    <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                    <AiOutlineMail className="icon" />
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                </div>
                <div className="form-group">
                    <AiOutlinePhone className="icon" />
                    <input type="text" id="phone" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                </div>
                <div className="form-group">
                    <AiOutlineMessage className="icon" />
                    <textarea id="message" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                    {formErrors.message && <span className="error">{formErrors.message}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Inquiry;
