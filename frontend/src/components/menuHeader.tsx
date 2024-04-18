import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import toast from "react-hot-toast";
import { BiLogOut, BiSolidMessageRoundedEdit } from "react-icons/bi"; // Import logout icon from react-icons/bi
import { IoChatbox } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetContacts } from "../redux/reducer/contactReducer";
import { resetUser } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";
import Modal from "@mui/material/Modal";
import ScheduleForm from "./scheduleChat";
import { closeModal, openModal } from "../redux/reducer/scheduleReducer";
import { BsThreeDotsVertical } from "react-icons/bs";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MenuHeader = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const KOL_User = useSelector(
    (state: RootState) => state.userReducer.user?.firstname
  );

  const isModalOpen = useSelector((state: RootState) => state.modal.modalOpen);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(resetUser());
    dispatch(resetContacts([]));
    localStorage.removeItem("token");
    const message = "Logout successful";
    toast.success(message);

    navigator("/login");
    console.log("navigating to login...", localStorage.getItem("token"));
  };

  const handleSchedule = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
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
        <Typography
          variant="h4"
          sx={{ ml: 2, color: "white", marginRight: "1.2rem" }}
        >
          {KOL_User}
        </Typography>
        <IoChatbox style={{ marginRight: "1.2rem" }} /> INBOX
      </Typography>

      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical size={40} color="white" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Tooltip title="Schedule Message">
            <IconButton aria-label="logout" onClick={handleSchedule}>
              <BiSolidMessageRoundedEdit />
            </IconButton>
          </Tooltip>
        </MenuItem>
        <MenuItem>
          <Tooltip title="Logout">
            <IconButton aria-label="logout" onClick={handleLogout}>
              <BiLogOut />
            </IconButton>
          </Tooltip>
        </MenuItem>
      </Menu>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <ScheduleForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default MenuHeader;
