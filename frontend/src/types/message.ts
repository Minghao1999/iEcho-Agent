export interface Contact {
  _id?: string;
  phonenumber: string;
  name: string;
  lastmessage: string;
  setting: "auto" | "manual";
}

export interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  selectedContact: Contact | null;
}

export interface Message {
  _id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface GetMessageResponse {
  _id: string;
  phonenumber: {
    _id: string;
    phonenumber: string;
  };
  data: Message[];
}

export interface Conversation {
  name: string;
  lastMessage: string;
}

export interface MessageSocket {
  data: { text: string };
  text: string;
  from: string;
  id: string;
  name: string;
  timestamp: string;
  type: string;
}
