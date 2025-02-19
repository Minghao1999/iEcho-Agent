import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

const UserProfile = () => {
    const user = useSelector((state: RootState) => state.userReducer.user);
    const firstName = user?.firstname || "Not Available";
    const lastName = user?.lastname || "Not Available";
    const phone = user?.phone || "Not Available";
    const email = user?.email || "Not Available";

    const containerStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    };

    const textStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        color: "#fff",
        fontSize: "30px",
        lineHeight: "2",
    };

    return (
        <div style={containerStyle}>
            <img src={"/assets/background.jpg"} alt={"comingSoon"} style={imageStyle} />
            <div style={textStyle}>
                <p>FirstName: {firstName}</p>
                <p>LastName: {lastName}</p>
                <p>Phone Number: {phone}</p>
                <p>Email: {email}</p>
            </div>
        </div>
    );
};

export default UserProfile;
