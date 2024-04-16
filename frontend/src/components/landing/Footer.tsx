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
            <div className="footer-content">
                <div className="contact-info">
                    <h4>Contact Us</h4>
                    <p>Email: info@yourcompany.com</p>
                    <p>Phone: +1234567890</p>
                    <p>Address: 123 Street, City, Country</p>
                </div>
                <div className="quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Demo</a></li>
                        <li><a href="/portfolio">Login</a></li>
                    </ul>
                </div>
                <div className="newsletter">
                    <h4>Subscribe to Our Newsletter</h4>
                    <form>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
