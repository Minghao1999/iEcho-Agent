import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types/message";



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
