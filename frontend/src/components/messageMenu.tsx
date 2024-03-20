import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContacts,
  setSelectedContact,
} from "../redux/reducer/contactReducer";
import { RootState } from "../redux/store";
import { Contact } from "../types/message";

const MessageMenu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://127.0.0.1:5000/api/v1/chat/contact/get")
      .then((response) => response.json())
      .then((data) => {
        // Check if API request was successful and data is available
        if (data.success && data.data) {
          dispatch(addContacts(data.data)); // Dispatch received contacts to Redux store
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  // Assuming you have a selector to get the selected contact from the Redux store
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleContactClick = (contact: Contact) => {
    dispatch(setSelectedContact(contact)); // Dispatch setSelectedContact action to update the selected contact
  };

  // Get contacts from Redux store
  const contacts = useSelector(
    (state: RootState) => state.contactReducer.contacts
  );

  const filteredConversations = contacts.filter(
    (conversation) =>
      conversation.name &&
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="message-menu">
      <input
        type="text"
        placeholder="Search Conversations..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="conversation-container">
        {filteredConversations.map((conversation, index) => (
          <div
            className={`conversation ${
              selectedContact && selectedContact.phone === conversation.phone
                ? "selected"
                : ""
            }`}
            key={index}
            onClick={() => handleContactClick(conversation)}
          >
            <div className="profile-info">
              <div className="logo">
                <span>{conversation.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="info">
              <div className="name">{conversation.name}</div>
              <div className="last-message">{conversation.lastmessage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageMenu;
