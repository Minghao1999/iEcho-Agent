import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { MessageSendRequest, SendMessageResponse } from "../../types/api";
import { Message } from "../../types/message";

export const messageAPI = createApi({
  reducerPath: "messageAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/v1/chat/message",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token") || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMessage: builder.query<Message[], string>({
      query: (phoneNumber) => `get/${phoneNumber}`,
    }),
    sendMessage: builder.mutation<SendMessageResponse, Partial<MessageSendRequest>>({
      query: (message) => ({
        url: "add",
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const { useGetMessageQuery, useSendMessageMutation } = messageAPI;


