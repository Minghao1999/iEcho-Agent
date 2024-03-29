import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import Chat from "../components/Chat";
import Header from "../components/menuHeader";
import MessageMenu from "../components/messageMenu";
import { updateLastMessage } from "../redux/reducer/contactReducer";
import { addMessage } from "../redux/reducer/messageReducer";
import { BotMessageResponse } from "../types/api";
import { MessageSocket } from "../types/message";

const Dashboard = () => {
  const socket = useMemo(() => io(`${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_SOCKET_PORT}`), []);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSocketConnect = () => {
      console.log("Connected to server", socket.id);
    };

    const handleIncomingMessage = (data: MessageSocket) => {
      const milliseconds = Number(data.timestamp) * 1000;
      const date = new Date(milliseconds);
      const formattedDate = date.toLocaleString("en-US");
      console.log("Date", formattedDate);

      const msg = {
        _id: data.id,
        sender: data.from,
        text: data.data.text,
        timestamp: formattedDate,
      };

      const notification = `Msg from ${data.from}\nText: ${data.data.text}\nTimestamp: ${formattedDate}`;
      dispatch(updateLastMessage({ phone: data.from, lastmessage: data.data.text }));
      dispatch(addMessage(msg));

      toast.success(notification, {
        position: "top-right",
        icon: "🔔",
      });
    };

    const handleBotMessage = (data: BotMessageResponse) => {
      dispatch(updateLastMessage({ phone: data.phonenumber, lastmessage: data.data.text }));
      dispatch(addMessage(data.data));
    };

    socket.on("connect", handleSocketConnect);
    socket.on("message", handleIncomingMessage);
    socket.on("bot-message", handleBotMessage);

    // Clean up socket listeners
    return () => {
      socket.off("connect", handleSocketConnect);
      socket.off("message", handleIncomingMessage);
      socket.off("bot-message", handleBotMessage);
    };
  }, [socket, dispatch]);

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
