import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FaFacebookSquare className="icon" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="icon" />
                </a>
            </div>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
