import React from "react";
import Footer from "../components/landing/Footer";
import Inquiry from "../components/landing/Inquiry";
import NavBar from "../components/landing/NavBar";

const Demo: React.FC = () => {
  return (
    <div className="home-page">
      <NavBar />

      <section className="demo-form-section">
        <Inquiry />
      </section>

      <footer className="footer-section">
        <Footer />
      </footer>
    </div>
  );
};

export default Demo;
