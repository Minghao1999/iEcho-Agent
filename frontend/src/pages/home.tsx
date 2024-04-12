import React from "react";
import NavBar from "../components/landing/NavBar";
import Hero from "../components/landing/hero";
import Feature from "../components/landing/Feature";
import Inquiry from "../components/landing/Inquiry";
import Footer from "../components/landing/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <NavBar />

      {/* Hero Section */}
      <section className="hero-section">
        <Hero />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Feature />
      </section>

      {/* Demo Form Section */}
      <section className="demo-form-section">
        <Inquiry />
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
