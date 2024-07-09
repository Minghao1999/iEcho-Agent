import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetContactQuery } from "../redux/api/contactAPI";
import {
  addContacts,
  setSelectedContact,
} from "../redux/reducer/contactReducer";
import { RootState } from "../redux/store";
import { Contact } from "../types/message";
import MsgSkeletonLoading from "./loader/menuSkeletonLoading";

const MessageMenu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const { data, isLoading } = useGetContactQuery("");

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

  useEffect(() => {
    if (data) {
      const uniqueContacts = data.data.filter(
          (contact:Contact) =>
              !contacts.some(
                  (existingContact) => existingContact.phonenumber === contact.phonenumber
              )
      )
      dispatch(addContacts(uniqueContacts));
    }
  }, [data]);

  return (
    <div className="message-menu">
      <input
        type="text"
        placeholder="Search Conversation"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="conversation-container">
        {isLoading
          ? [...Array(6)].map((_, index) => <MsgSkeletonLoading key={index} />)
          : filteredConversations.map((conversation, index) => (
              <div
                className={`conversation ${
                  selectedContact &&
                  selectedContact.phonenumber === conversation.phonenumber
                    ? "selected"
                    : ""
                }`}
                key={index}
                onClick={() => handleContactClick(conversation)}
              >
                <div className="profile-info">
                  <div className="logo">
                    {conversation.name && (
                      <span>{conversation.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </div>
                <div className="info">
                  <div className="name">{conversation.name}</div>
                  <div className="last-message">
                    {conversation.lastmessage &&
                      conversation.lastmessage
                        .split(" ")
                        .slice(0, 5)
                        .join(" ")}
                    {conversation.lastmessage &&
                      conversation.lastmessage.split(" ").length > 10 &&
                      "..."}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MessageMenu;
