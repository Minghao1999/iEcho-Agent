export interface Contact{
    _id?: string;
    phone: string | null;
    name: string | null;
    lastmessage: string | null;
    
}

export interface ContactsState {
    contacts: Contact[];
    isLoading: boolean;
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

