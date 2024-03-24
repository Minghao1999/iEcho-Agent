import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Setting from "./chatSetting";

const ChatHeader = () => {
  const selectedContact = useSelector(
    (state: RootState) => state.contactReducer.selectedContact
  );

  // Function to get the first character of a string
  const getFirstCharacter = (str: string) => {
    return str.charAt(0).toUpperCase();
  };

  // Logic to get the first character of the contact's name
  const firstCharacter = selectedContact?.name
    ? getFirstCharacter(selectedContact.name)
    : "";

  return (
    
    <header className="chatheader">
      <Card>
        <CardHeader     
          avatar={<Avatar sx={{ bgcolor: "red" }}>{firstCharacter}</Avatar>}
          title={selectedContact?.name}
          subheader={selectedContact?.phonenumber}
        />
      </Card>
      <Setting />
    </header>
  );
};

export default ChatHeader;
