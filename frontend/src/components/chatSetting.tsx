import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactSetting } from "../redux/reducer/contactReducer";
import { RootState } from "../redux/store";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

const Setting: React.FC = () => {
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );
  const [selectedOption, setSelectedOption] = useState<"manual" | "auto">(
    selectedContact?.setting || "manual"
  ); // Set default option

  const dispatch = useDispatch();

  const handleOptionToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.checked ? "auto" : "manual";
    setSelectedOption(option);
    updateSetting(option);
  };

  const updateSetting = (option: string) => {
    axios
      .post("http://127.0.0.1:5000/api/v1/chat/update/setting", {
        phonenumber: selectedContact?.phonenumber,
        setting: option,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(
          updateContactSetting({
            phone: selectedContact?.phonenumber as string ,
            setting: option as "manual" | "auto" ,
          })
        );
      })
      .catch((error) => {
        console.error("Error updating setting:", error);
      });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", backgroundColor: "white" }}>
      <FormControlLabel
        control={
          <Switch
            defaultChecked={selectedOption === "auto"}
            onChange={handleOptionToggle}
            color="warning"
          />
        }
        label={
          <Typography variant="body1" style={{ color: "black" }}>
            {selectedOption === "auto" ? "Auto" : "Manual"}
          </Typography>
        }
      />
    </div>
  );
};

export default Setting;
