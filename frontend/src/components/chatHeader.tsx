// Header.js

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Setting from "./chatSetting";

const ChatHeader = () => {
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );

  // Function to get the first character of a string
  const getFirstCharacter = (str:string) => {
    return str.charAt(0).toUpperCase();
  };

  // Logic to get the first character of the contact's name
  const firstCharacter = selectedContact?.name
    ? getFirstCharacter(selectedContact.name)
    : "";

  return (
    <header className="chatheader">
      <div className="profile">
        <div className="profile-info">
          <div className="logo">
            <span>{firstCharacter}</span>
          </div>
          <div className="additional-info">
            <p>{selectedContact?.name}</p>
            <p>{selectedContact?.phonenumber}</p>
          </div>
        </div>
      </div>
      <Setting />
    </header>
  );
};

export default ChatHeader;
