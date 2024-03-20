// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { contactAPI } from "./api/contactAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { contactReducer } from "./reducer/contactReducer";


export const server =  "http://127.0.0.1:5000";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [contactReducer.name]: contactReducer.reducer,
    [contactAPI.reducerPath]: contactAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, contactAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;