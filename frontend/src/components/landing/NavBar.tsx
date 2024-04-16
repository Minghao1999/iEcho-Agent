import { Link } from "react-router-dom";
import { logo } from "../../../assets/icons/index";
import "../../styles/landing/_navbar.scss";
interface NavLink {
  path: string;
  label: string;
}

const navLinks: NavLink[] = [
  { path: "/", label: "Home" },
  { path: "/", label: "About" },
  { path: "/", label: "Demo" },
  { path: "/Login", label: "Login" }
];

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"} className="navbar-link">
        <img src={logo} alt="" />
      </Link>
      <div className="spacer" />
      {navLinks.map((link, index) => (
        <Link key={index} to={link.path} className="navbar-link">
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
