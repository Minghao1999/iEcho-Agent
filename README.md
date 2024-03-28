# KOL Application

The KOL Chat Application allows celebrities to communicate with their friends and fans via a chat interface. This document serves as a comprehensive guide for understanding the application's functionality, architecture, and usage.

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Node Js & Npm [Download and Install](https://nodejs.org/en)
- MongoDB [Download and Install](https://www.mongodb.com/docs/manual/installation/)
- Git [Download and Install](https://git-scm.com/downloads)

## Technology Used

### MERN Stack (MongoDB, Express.js, React.js, Node.js): For building the frontend and backend of the application.

### Socket.IO: For real-time communication between the client and server.

### React,Redux: For frontend development.

### npm or yarn: For package management.

### MongoDB Atlas: For cloud-based MongoDB database hosting.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in server directory

### For server

`PORT` = `5000`
`HOST`
`MongoDB_URL`
`SITE_URL`
`SITE_PORT`
`CORS_ORIGIN`
`GEMINI_API_KEY`
`JWT_PRIVATE_KEY`
`MAIL_EMAIL`
`MAIL_SECRET`

#### Whatsapp API

`FROM`
`TOKEN`
`TO`
`WEBHOOK_VERIFY_TOKEN`

To run this project, you will need to add the following environment variables to your .env file in client directory

## Run Locally

Clone the project

```bash
  git clone https://github.com/bayesianinstitute/KOL_Chat.git
```

## To Start BackEnd

Go to the server directory

```bash
  cd KOL_Chat/server
```

Install dependencies

```bash
  npm install
```

Start

```bash
  npm run demo
```

## To Start FrontEnd

Go to the client directory

```bash
  cd KOL_Chat/frontend
```

Install dependencies

```bash
  npm install
```

Start

```bash
  npm run dev
```
