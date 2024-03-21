export interface Contact {
  _id?: string;
  phonenumber: string;
  name: string;
  lastmessage: string;
}

export interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  selectedContact: Contact | null;
}
export interface Message {
  _id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export interface Conversation {
  name: string;
  lastMessage: string;
}
