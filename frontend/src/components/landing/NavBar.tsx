import { Link } from "react-router-dom";
import { logo } from "../../../assets/icons/index";
import classes from "../UI/home/home.module.css";

interface NavLink {
    path: string;
    label: string;
}

const navLinks: NavLink[] = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/demo", label: "Request" },
    { path: "/Login", label: "Login" }
];

const NavBar = () => {
    return (
        <div className={classes.rectangle7}>
            <div>
                <Link to={"/"} >
                    <img className={classes.image1} src={logo} alt="" />
                </Link>
            </div>
            <div className={classes.frame1}>
                {navLinks.map((link, index) => (
                    <Link key={index} to={link.path} className={classes.home}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavBar;
