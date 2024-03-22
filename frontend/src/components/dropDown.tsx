import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactSetting } from "../redux/reducer/contactReducer";
import { RootState } from "../redux/store";


const Dropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const seletedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );
  const dispatch = useDispatch();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    axios
      .post("http://127.0.0.1:5000/api/v1/chat/update/setting", {
        phonenumber: seletedContact?.phonenumber,
        setting: option,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(
          updateContactSetting({
            phone: seletedContact?.phonenumber,
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
        <button
          className={`option ${selectedOption === "auto" && "selected"}`}
          onClick={() => handleOptionClick("auto")}
        >
          Auto
        </button>
        <button
          className={`option ${selectedOption === "manual" && "selected"}`}
          onClick={() => handleOptionClick("manual")}
        >
          Manually
        </button>
      </div>
      <div className={`selected-option ${selectedOption}`}>
        {selectedOption}
      </div>
    </div>
  );
};

export default Dropdown;
