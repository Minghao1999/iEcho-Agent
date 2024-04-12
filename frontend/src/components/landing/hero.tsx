import { mobile_hero } from "../../../assets/icons/index.ts";

const Hero = () => {
  return (
    <div className="container">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to <span>KOL</span>
        </h1>
        <p className="hero-description">
          KOL is a platform that helps you to connect with your friends and
          family.
        </p>
      </div>
      <aside>
        <img src={mobile_hero} alt="KOL LOGO" />
      </aside>
    </div>
  );
};

export default Hero;
