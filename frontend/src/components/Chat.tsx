import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Message } from "../types/message";
import EmptyChat from "./EmptyChat";
import ChatHeader from "./chatHeader";

const Chat: React.FC = () => {
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );


  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (selectedContact) {
      axios
        .get(
          `http://127.0.0.1:5000/api/v1/chat/message/get/${selectedContact.phonenumber}`
        )
        .then((response) => {
          const data = response.data;
          if (Array.isArray(data) && data.length > 0) {
            setMessages(data[0].data);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [selectedContact]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const date=new Date()
      const currentTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const newMessage: Message = {
        _id: String(messages.length + 1),
        sender: "me",
        text: (inputValue.trim()), 
        timestamp: currentTime,
      };
      if(!selectedContact) return;
      // Add axios POST request here
      axios.post('http://127.0.0.1:5000/api/v1/chat/message/add', {
        phonenumber: selectedContact.phonenumber,
        sender: newMessage.sender,
        text: newMessage.text,
        type: "text",
        name: selectedContact.name
      }).then(response => {
        console.log("Message sent successfully:", response.data);
      }).catch(error => {
        console.error("Error sending message:", error);
      });


      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <div className="chat-messages">
        {!selectedContact ? (
          <EmptyChat />
        ) : (
          messages.map((message) => (
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
          ))
        )}
      </div>

      {/* Bottom section for typing message */}
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
    </div>
  );
};

export default Chat;
