import React, { useState } from 'react';

// Assuming dummyConversations is an array of objects with 'name' and 'lastMessage' properties
interface Conversation {
  name: string;
  lastMessage: string;
}

const dummyConversations: Conversation[] = [
  { name: 'John Doe', lastMessage: 'Hello there!' },
  { name: 'Jane Smith', lastMessage: 'How are you?' },
  { name: 'John Doe', lastMessage: 'Hello there!' },
  { name: 'Jane Smith', lastMessage: 'How are you?' },
  { name: 'John Doe', lastMessage: 'Hello there!' },
  { name: 'Jane Smith', lastMessage: 'How are you?' },
  { name: 'John Doe', lastMessage: 'Hello there!' },
  { name: 'Jane Smith', lastMessage: 'How are you?' },
  // Add more conversations as needed
];

const MessageMenu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredConversations = dummyConversations.filter((conversation) =>
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
          <div className="conversation" key={index}>
            <img className="logo" src="" alt="" />
            <div className="info">
              <div className="name">{conversation.name}</div>
              <div className="last-message">{conversation.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageMenu;
