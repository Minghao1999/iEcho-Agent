// Header.js

import { CiVideoOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";

const ChatHeader = () => {
  return (
    <header className="chatheader">
      <div className="profile-info">
        <img className="logo" src="" alt="" />
        <div className="additional-info">
          <p>name</p>
          <p>online</p>
        </div>
      </div>
      <div className="action">
        <FaPhone />
        <CiVideoOn />
      </div>
    </header>
  );
};

export default ChatHeader;
