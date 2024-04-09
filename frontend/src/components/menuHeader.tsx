import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi"; // Import logout icon from react-icons/bi
import { IoChatbox } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetContacts } from "../redux/reducer/contactReducer";
import { resetUser } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";

const MenuHeader = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const KOL_User=useSelector((state:RootState)=>state.userReducer.user?.firstname)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(resetUser());
    dispatch(resetContacts([]));
    localStorage.removeItem("token");
    const message = "Logout successful";
    toast.success(message);

    navigator("/login");
    console.log("navigating to login...", localStorage.getItem("token"));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ bgcolor: "black", height: "12%" }}
      component="header"
    >
      <Typography
        variant="h4"
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

        <Typography variant="h4" sx={{ ml: 2, color: "white" ,marginRight: "1.2rem"}}>
          {KOL_User}
        </Typography>
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

export default MenuHeader;
