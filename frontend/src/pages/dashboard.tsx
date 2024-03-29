import { useEffect, useMemo } from "react";
import Chat from "../components/Chat";
import Header from "../components/menuHeader";
import MessageMenu from "../components/messageMenu";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { MessageSocket } from "../types/message";
import { useDispatch } from "react-redux";
import { updateLastMessage } from "../redux/reducer/contactReducer";
import { addMessage } from "../redux/reducer/messageReducer";

const Dashboard = () => {
  const socket = useMemo(() => io("http://127.0.0.1:8000"), []);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connect from server", socket.id);
    });
    socket.on("message", (data: MessageSocket) => {
      console.log("Socket", data);
      const milliseconds = Number(data.timestamp) * 1000;

      // Create a new Date object using the milliseconds
      const date = new Date(milliseconds);

      // Format the date in en-US format
      const formattedDate = date.toLocaleString("en-US");

      console.log("Date", formattedDate);
      const msg = {
        _id: data.id,
        sender: data.from,
        text: data.data.text,
        timestamp: formattedDate,
      };
      const notification = `Msg from ${data.from} \n Text: ${data.data.text} \n Timestamp: ${formattedDate}`;
      dispatch(
        updateLastMessage({ phone: data.from, lastmessage: data.data.text })
      );

      dispatch(addMessage(msg));
      toast.success(notification, {
        position: "top-right",
        icon: "🔔",
      });
    });

    return () => {
      socket.off("connect");
      socket.off("welcome");
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
