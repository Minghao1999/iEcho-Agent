import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  _id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface MessageState {
  messages: Message[];
}

const initialState: MessageState = {
  messages: [],
};

export const messageReducer = createSlice({
  name: 'messageReducer',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessages } = messageReducer.actions;

// export default messageReducer.reducer;
