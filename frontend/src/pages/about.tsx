import React from "react";
import Footer from "../components/landing/Footer";
import NavBar from "../components/landing/NavBar";
import AboutUs from "../components/landing/about";

const About: React.FC = () => {
  return (
    <div className="home-page">
      <NavBar />

      <section className="hero-section">
        <AboutUs />
      </section>

      <footer className="footer-section">
        <Footer />
      </footer>
    </div>
  );
};

export default About;
