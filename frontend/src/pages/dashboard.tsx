import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Chat from "../components/Chat";
import MenuHeader from "../components/menuHeader";
import MessageMenu from "../components/messageMenu";
import { addContact, updateLastMessage } from "../redux/reducer/contactReducer";
import { addMessage } from "../redux/reducer/messageReducer";
import { BotMessageResponse } from "../types/api";
import { MessageSocket } from "../types/message";
import { RootState } from "../redux/store";

const Dashboard = () => {
  const socket = useMemo(() => io(`${import.meta.env.VITE_SERVER_SOCKET_IP}`), []);
  const dispatch = useDispatch();
  const AllContact = useSelector((state: RootState) => state.contactReducer.contacts);

  useEffect(() => {
    const handleSocketConnect = () => {
      console.log("Connected to server", socket.id);
    };

    const handleIncomingMessage = (data: MessageSocket) => {
      const milliseconds = Number(data.timestamp) * 1000;
      const date = new Date(milliseconds);
      const formattedDate = date.toLocaleString("en-US");

      const msg = {
        _id: data.id,
        sender: data.from,
        text: data.data.text,
        timestamp: formattedDate,
      };
      const contactExists = AllContact.some(contact => contact.phonenumber === data.from);
      if (!contactExists) {
        dispatch(addContact({_id: data.id, phonenumber: data.from,name:data.name,lastmessage:"",setting:"auto"}));
      }
      const notification = `Msg from ${data.from}\nText: ${data.data.text}\nTime: ${formattedDate}`;
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
  }, [socket, dispatch, AllContact]);

  return (
    <div className="dashboard">
      <aside>
        <MenuHeader />
        <MessageMenu />
      </aside>
      <main>
        <Chat />
      </main>
    </div>
  );
};

export default Dashboard;
