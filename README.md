# KOL Application

The KOL Chat Application facilitates communication between celebrities and their friends and fans through a chat interface. This document serves as a comprehensive guide to understanding the application's functionality, architecture, and usage.

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed on your development machine:

- **Node.js & NPM**: Download and install from [here](https://nodejs.org/en).
- **MongoDB**: Download and install from [here](https://www.mongodb.com/docs/manual/installation/).
- **Git**: Download and install from [here](https://git-scm.com/downloads).

## Technology Stack

The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) for both frontend and backend development. Real-time communication between the client and server is facilitated by Socket.IO. Additional technologies include React, Redux for frontend development, and npm or yarn for package management. MongoDB Atlas is utilized for cloud-based MongoDB database hosting.

## Environment Variables

To run this project locally, you'll need to set up environment variables. Create a `.env` file in both the server and client directories. You can refer to `.env.example` in the server directory for guidance.

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