import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddChatRequest, ChatResponse, NewChatRequest } from "../../types/api";
import Cookies from 'js-cookie';
export const chatAPI = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/v1/chat",
    prepareHeaders: (headers) => {
      // Get token from the state
      const token = Cookies.get("token") || localStorage.getItem("token");
      console.log("Toke",token);
      if (token) {
        // If token exists, set it in the headers
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include"
    


  }),
  endpoints: (builder) => ({
    newchat: builder.mutation<ChatResponse, NewChatRequest>({
      query: (data) => ({
        url: "/new",
        credentials:"include",
        method: "POST",
        body: data,
      }),
    }),
    addchat: builder.mutation<ChatResponse, AddChatRequest>({
      query: (data) => ({
        url: "/update",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// Accessing the signup, signupFinish, and setUserRole mutations
export const { useNewchatMutation, useAddchatMutation } = chatAPI;
