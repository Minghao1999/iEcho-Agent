// menuHeader.tsx
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import classes from "./UI/chat/chat.module.css";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiLogOut, BiSolidMessageRoundedEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetContacts } from "../redux/reducer/contactReducer";
import { resetUser } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";
import Modal from "@mui/material/Modal";
import ScheduleForm from "./scheduleChat";
import { closeModal, openModal } from "../redux/reducer/scheduleReducer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logo } from "../../assets/icons";

const MenuHeader = ({ setActiveButton }: { setActiveButton: (button: string) => void }) => {
    const [activeButton, setActiveButtonLocal] = useState<string>("chat");
    const navigator = useNavigate();
    const dispatch = useDispatch();
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
        toast.success("Logout successful");
        navigator("/login");
    };

    const handleSchedule = () => {
        dispatch(openModal());
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
        setActiveButtonLocal(button);
    };

    const getRectangleStyle = () => {
        switch (activeButton) {
            case "user":
                return { top: "110px" };
            case "chat":
                return { top: "230px" };
            case "myspace":
                return { top: "360px" };
            case "share":
                return { top: "480px" };
            default:
                return {};
        }
    };

    return (
        <div>
            <a href="/">
                <img className={classes.image1} src={logo} alt="logo" />
            </a>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className={classes.settings}
            ></Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
                <MenuItem>
                    <Tooltip title="Schedule Message">
                        <IconButton aria-label="schedule" onClick={handleSchedule}>
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
            <div style={{position:"relative",zIndex:1}}>
                <Button className={classes.user} onClick={() => handleButtonClick("user")}></Button>
                <Button className={classes.chat} onClick={() => handleButtonClick("chat")}></Button>
                <Button className={classes.mySpace} onClick={() => handleButtonClick("myspace")}></Button>
                <Button className={classes.share} onClick={() => handleButtonClick("share")}></Button>
            </div>
            <div className={classes.rectangle30} style={getRectangleStyle()}></div>
        </div>
    );
};

export default MenuHeader;
