import React from "react";
import Footer from "../components/landing/Footer";
import NavBar from "../components/landing/NavBar";
import AboutUs from "../components/landing/about";

const About: React.FC = () => {
  return (
    <div className="home-page">
      <NavBar />

      <section >
        <AboutUs />
      </section>

      <footer >
        <Footer />
      </footer>
    </div>
  );
};

export default About;
