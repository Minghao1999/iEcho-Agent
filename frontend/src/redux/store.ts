// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { contactAPI } from "./api/contactAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { contactReducer } from "./reducer/contactReducer";
import { messageAPI } from "./api/messageAPI";
import { messageReducer } from "./reducer/messageReducer";
import { modalReducer } from "./reducer/scheduleReducer";


export const server =  "http://127.0.0.1:5000";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [contactReducer.name]: contactReducer.reducer,
    [contactAPI.reducerPath]: contactAPI.reducer,
    [messageAPI.reducerPath]: messageAPI.reducer,
    [messageReducer.reducerPath]: messageReducer.reducer,
    [modalReducer.reducerPath]: modalReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, contactAPI.middleware, messageAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;