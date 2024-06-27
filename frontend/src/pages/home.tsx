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
      <section>
        <Hero />
      </section>

      {/* Features Section */}
      <section>
        <Feature />
      </section>

      {/* Demo Form Section */}
      <section>
        <Inquiry />
      </section>

      {/* Footer Section */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
