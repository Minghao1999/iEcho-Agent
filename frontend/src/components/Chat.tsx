import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMessageQuery,
  useSendMessageMutation,
} from "../redux/api/messageAPI";
import { RootState } from "../redux/store";
import { Message } from "../types/message";
import EmptyChat from "./EmptyChat";
import ChatHeader from "./chatHeader";
import SkeletonLoader from "./loader/skeletonLoader";
import { updateLastMessage } from "../redux/reducer/contactReducer";
import { addMessage, setMessages } from "../redux/reducer/messageReducer";
import toast from "react-hot-toast";
import { MarkdownRenderer } from "./mardownFormat";

const Chat: React.FC = () => {
  const { selectedContact } = useSelector(
    (state: RootState) => state.contactReducer
  );

  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.messageReducer.messages
  );
  // const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const autoScroll = useRef<HTMLDivElement>(null);

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
      dispatch(setMessages(contactMessages[0].data));
    }
  }, [contactMessages, dispatch]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (autoScroll.current) {
      autoScroll.current.scrollTop = autoScroll.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
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
      const response = await sendMessage({
        phonenumber: selectedContact.phonenumber,
        sender: newMessage.sender,
        text: newMessage.text,
        type: "text",
        name: selectedContact.name,
      });
      if ("data" in response) {
        const msg = response.data.data;
        console.log(msg);
        dispatch(addMessage(msg));
        dispatch(
          updateLastMessage({
            phone: selectedContact.phonenumber,
            lastmessage: newMessage.text,
          })
        );

        setInputValue("");
      } else {
        toast.error("Error sending message:");
      }
    }
  };

  return (
    <div className="chat-container">
      {selectedContact && <ChatHeader />}

      <div className="chat-messages" ref={autoScroll}>
        {!selectedContact ? (
          <EmptyChat />
        ) : isLoading ? ( // Render Skeleton when loading
          <SkeletonLoader
            variantType="text"
            width={210}
            height={118}
            numofLoaders={3}
          />
        ) : (
          <div className="message-body">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.sender === "me" ? "sent" : "received"
                }`}
              >
                <div className="message-content">
                  <MarkdownRenderer content={message.text} />
                </div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
            {/* <div ref={messagesEndRef} /> */}
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
          <Box
            sx={{
              fontWeight: "bold",
              p: 3,
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
            }}
          >
            This message is handled automatically...
          </Box>
        )
      ) : null}
    </div>
  );
};

export default Chat;
