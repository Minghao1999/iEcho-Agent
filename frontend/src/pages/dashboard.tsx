import Chat from "../components/Chat";
import Header from "../components/header";
import MessageMenu from "../components/messageMenu";

const Dashboard = () => {
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
