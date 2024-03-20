// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { chatReducer } from "./reducer/chatReducer";
import { chatAPI } from "./api/chatAPI";


export const server = import.meta.env.VITE_SERVER || "http://127.0.0.1:5000";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [chatReducer.name]: chatReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, chatAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;