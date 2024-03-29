import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateSettingMutation } from "../redux/api/contactAPI";
import { updateContactSetting } from "../redux/reducer/contactReducer";
import { RootState } from "../redux/store";
import { MessageResponse } from "../types/api";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const ChatHeader = () => {
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );

  const [updateSetting] = useUpdateSettingMutation();
  const dispatch = useDispatch();

  const handleOptionToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const option = event.target.checked ? "auto" : "manual";
    if (selectedContact?.phonenumber) {
      const res = await updateSetting({
        phonenumber: selectedContact?.phonenumber,
        setting: option,
      });

      if ("data" in res) {
        dispatch(
          updateContactSetting({
            phone: selectedContact?.phonenumber as string,
            setting: option,
          })
        );
        const message = res.data as MessageResponse;

        toast.success(message.message || "success updated Settings");
      } else {
        const err = res.error as FetchBaseQueryError;
        const message = err.data as MessageResponse;
        toast.error("Failed to change Setting" + message.message);
      }
    }
  };

  return (
    <header className="chatheader">
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }}>
              {selectedContact?.name
                ? selectedContact?.name.charAt(0).toUpperCase()
                : ""}
            </Avatar>
          }
          title={selectedContact?.name}
          subheader={selectedContact?.phonenumber}
        />
      </Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "0.6rem",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={selectedContact?.setting === "auto"}
              onChange={handleOptionToggle}
              color="warning"
            />
          }
          label={
            <Typography variant="body1" style={{ color: "black" }}>
              {selectedContact && selectedContact.setting === "auto"
                ? "Auto Chat"
                : "Manual Chat"}
            </Typography>
          }
        />
      </div>
    </header>
  );
};

export default ChatHeader;
