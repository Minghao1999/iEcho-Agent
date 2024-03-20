// Chat.tsx
import React, { useState } from 'react';
import ChatHeader from './chatHeader';
import { IoMdSend } from "react-icons/io";

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string; // Add timestamp property
}

const Chat: React.FC = () => {
  // Dummy data for the chat
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },
    { id: 1, sender: 'friend', message: 'Hi there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'me', message: 'Hey! How are you?', timestamp: '10:05 AM' },

    // Add more dummy messages as needed
  ]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'me',
        message: inputValue.trim(),
        timestamp: currentTime
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
            <div className="message-content">{message.message}</div>
            <div className="message-time">{message.timestamp}</div>
          </div>
        ))}
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
        <IoMdSend size={30} className='sendBtn' color='green' onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
