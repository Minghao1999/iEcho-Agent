import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineMessage } from 'react-icons/ai';

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
    };

    return (
        <div className="inquiry-form">
            <h2>Demo Inquiry Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <AiOutlineUser className="icon" />
                    <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <AiOutlineMail className="icon" />
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <AiOutlinePhone className="icon" />
                    <input type="text" id="phone" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <AiOutlineMessage className="icon" />
                    <textarea id="message" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Inquiry;
