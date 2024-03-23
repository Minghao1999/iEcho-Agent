import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactSetting } from "../redux/reducer/contactReducer";
import { RootState } from "../redux/store";
import Switch from "@mui/material/Switch";

const Setting: React.FC = () => {
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );
  const [selectedOption, setSelectedOption] = useState<string>(selectedContact?.setting); // Set default option

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
            phone: selectedContact?.phonenumber,
            setting: option,
          })
        );
      })
      .catch((error) => {
        console.error("Error updating setting:", error);
      });
  };

  return (
    <div className="dropdown-container">
      <div className="options-container">
        <Switch 
          defaultChecked={selectedOption === "auto"}
          onChange={handleOptionToggle}
        />
      </div>
      <div className={`selected-option ${selectedOption}`}>
        {selectedOption}
      </div>
    </div>
  );
};

export default Setting;
