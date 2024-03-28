import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi"; // Import logout icon from react-icons/bi
import { IoChatbox } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../redux/reducer/userReducer";
import Tooltip from "@mui/material/Tooltip";

const Header = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(resetUser());
    localStorage.removeItem("token");
    const message = "Logout successful";
    toast.success(message);
    // console.log("Redirecting to login...");
    navigator("/login");
  };


  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ bgcolor: "black",height: "12%" }}
      component="header"
    >
      <Typography
        variant="h3"
        gutterBottom
        component="div"
        sx={{
          p: 2.5,
          pb: 0,
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IoChatbox style={{ marginRight: "1.2rem" }} /> INBOX
      </Typography>

      <Tooltip title="Logout"> 
        <IconButton
          aria-label="logout"
          sx={{ color: "white" }}
          onClick={handleSubmit}
        >
          <BiLogOut />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Header;
