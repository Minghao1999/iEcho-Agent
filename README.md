# iEcho Application

The iEcho Chat Application facilitates communication between celebrities and their friends and fans through a chat interface. This document serves as a comprehensive guide to understanding the application's functionality, architecture, and usage.

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your development machine:

- **Node.js & NPM**: Download and install from [here](https://nodejs.org/en).
- **MongoDB**: Download and install from [here](https://www.mongodb.com/docs/manual/installation/).
- **Git**: Download and install from [here](https://git-scm.com/downloads).

## Technology Stack

The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) for both frontend and backend development. Real-time communication between the client and server is facilitated by Socket.IO. Additional technologies include React, Redux,RTK Query for frontend development, and npm or yarn for package management. MongoDB Atlas is utilized for cloud-based MongoDB database hosting.



## Feature: iEcho (AI) Assistant

The iEcho Chat Application includes  AI assistant designed specifically for WhatsApp. This AI assistant is capable of automatically responding to messages using Large Language Models (LLM), providing users with efficient communication management. Additionally, it offers the flexibility to switch between automatic AI responses and manual response mode, empowering users to tailor their communication approach as needed.

### Key Features:

1. **Automatic Message Responses**: The AI assistant can automatically respond to incoming messages using advanced language processing capabilities.

2. **Manual Response Mode**: Users have the option to switch to manual response mode, allowing them to personally engage with their contacts when desired.

3. **Scheduling Messaging**: The AI assistant supports scheduling messages, enabling users to plan and send messages at specific times, enhancing communication efficiency.


## Environment Variables

To run this project locally, you'll need to set up environment variables.

 Create a `.env` file in both the server and client directories. You can refer to `.env.example` in the server and client directory for guidance.

You'll also need to obtain the WhatsApp webhook information from [here](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started/).

## Running Locally

To run the project on your local machine, follow these steps:

### 1. Clone the Project

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/bayesianinstitute/KOL_Chat.git
```

### 2. Start Backend

Navigate to the server directory:

```bash
cd KOL_Chat/server
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run demo
```

### 3. Connect WhatsApp Api with Our Backend


Package used: https://github.com/tawn33y/whatsapp-cloud-api?tab=readme-ov-file

Follow this Tutorial : https://github.com/tawn33y/whatsapp-cloud-api/blob/main/TUTORIAL.md#3-setting-up-ngrok


```bash
ngrok http 5000
```
### 3. Start Frontend

Navigate to the client directory:

```bash
cd KOL_Chat/frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

