import { useEffect, useMemo } from "react";
import Chat from "../components/Chat";
import Header from "../components/header";
import MessageMenu from "../components/messageMenu";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { MessageSocket } from "../types/message";

const Dashboard = () => {
  const socket = useMemo(() => io("http://127.0.0.1:8000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connect from server", socket.id);
    });

    socket.on("message", (data:MessageSocket) => {
      console.log(data);
      toast.success(data.data.text);
      
    });

    return () => {
      socket.off("connect");
      socket.off("welcome");
    };
  }, [socket]);

  return (
    <div className="dashboard">
      <aside>
        <Header />
        <MessageMenu />
      </aside>
      <main>
        <Chat />
      </main>
    </div>
  );
};

export default Dashboard;
