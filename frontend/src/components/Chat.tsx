import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Message } from "../types/message";
import EmptyChat from "./EmptyChat";
import ChatHeader from "./chatHeader";
import {
  useGetMessageQuery,
  useSendMessageMutation,
} from "../redux/api/messageAPI";
import Skeleton from "@mui/material/Skeleton";

const Chat: React.FC = () => {
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // RTK Query hook to fetch contact messages
  const { data: contactMessages = [], isLoading } = useGetMessageQuery(
    selectedContact?.phonenumber ?? "",
    {
      skip: !selectedContact,
    }
  );

  // RTK Mutation hook to send a message
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (contactMessages.length > 0) {
      setMessages(contactMessages[0].data);
    }
  }, [contactMessages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && selectedContact) {
      const date = new Date();
      const currentTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const newMessage: Message = {
        _id: String(messages.length + 1),
        sender: "me",
        text: inputValue.trim(),
        timestamp: currentTime,
      };

      // RTK Mutation to send message
      sendMessage({
        phonenumber: selectedContact.phonenumber,
        sender: newMessage.sender,
        text: newMessage.text,
        type: "text",
        name: selectedContact.name,
      })
        .unwrap()
        .then(() => {
          console.log("Message sent successfully");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });

      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-container">
      {selectedContact && <ChatHeader />}

      <div className="chat-messages">
        {!selectedContact ? (
          <EmptyChat />
        ) : isLoading ? ( // Render Skeleton when loading
          <div className="skeleton-loading">
            <Skeleton variant="text" width={210} height={118} />
            <Skeleton variant="text" width={210} height={118} />
            <Skeleton variant="text" width={210} height={118} />
          </div>
        ) : (
          <div className="message-body">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.sender === "me" ? "sent" : "received"
                }`}
              >
                <div className="message-content">{message.text}</div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom section for typing message */}
      {selectedContact ? (
        selectedContact.setting === "manual" ? (
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              className="message-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <IoMdSend
              size={30}
              className="sendBtn"
              color="green"
              onClick={handleSendMessage}
            />
          </div>
        ) : (
          <section className="auto-footer">This is Automate Messaging ...</section>
        )
      ) : null}
    </div>
  );
};

export default Chat;
