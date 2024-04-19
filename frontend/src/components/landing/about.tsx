import {  mobile_hero } from "../../../assets/icons/index.ts";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="hero-content">
        <h1 className="hero-title">
          About Us <span>Bayes Solution</span>
        </h1>
        <p className="hero-description">
          At Bayes Solution, we're committed to providing cutting-edge AI and Blockchain solutions. Our expertise lies in developing innovative applications that leverage the power of artificial intelligence and blockchain technology. From smart contracts to predictive analytics, we empower businesses to embrace the future with confidence.
        </p>
      </div>
      <aside className="hero-image">
        <img src={mobile_hero} alt="Bayes Solution Logo" />
      </aside>
    </div>
  );
};

export default AboutUs;
