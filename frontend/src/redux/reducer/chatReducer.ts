import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessagesState } from "../../types/api";



const initialState: MessagesState = {
  prompt: '',
  content: '',
  _id: null,
  latest: {
    id: '',
    prompt: '',
    content: '',
  },
  all: [],
};

export const chatReducer = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    emptyAllRes: (state) => {
      state.prompt = '';
      state.content = '';
      state._id = null;
      state.latest.prompt = '';
      state.latest.content = '';
      state.all = [];
    },
    addList: (state, action: PayloadAction<{ _id: string; items: Message[] }>) => {
      const { _id, items } = action.payload;
      state._id = _id;
      state.all = items;
    },
    insertNew: (state, action: PayloadAction<{
      chatsId: string;
      content?: string | null;
      resume?: boolean;
      _id?: string | null;
      prompt?: string | null;
    }>) => {
      const { chatsId, content = null, resume = false, _id = null, prompt = null } = action.payload;

      if (_id) {
        state._id = _id;
      }

      state.latest.id = chatsId;

      if (prompt) {
        state.latest.prompt = prompt;
      }

      const addToList = (latest: Message) => {
        const existingMessage = state.all.find((obj) => obj.id === latest.id);
        if (existingMessage) {
          existingMessage.content = latest.content;
        } else {
          state.all.push(latest);
        }
      };

      if (content && resume) {
        state.latest.content = content;
        addToList(state.latest);
      }
    },
  },
});

// Export actions
export const { emptyAllRes, insertNew, addList } = chatReducer.actions;
