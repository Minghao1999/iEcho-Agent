import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {  ContactResponse, MessageResponse, UpdateSettingRequest } from "../../types/api";


export const contactAPI = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/api/v1/chat`,
    prepareHeaders: (headers) => {
      // Get token from the state
      const token = Cookies.get("token") || localStorage.getItem("token");
      if (token) {
        // If token exists, set it in the headers
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getContact: builder.query<ContactResponse,string>({
      query: () => ({
        url: "/contact/get",
        credentials: "include",
        method: "GET",
      }),
    }),
    updateSetting: builder.mutation<MessageResponse,UpdateSettingRequest >({
      query: (data) => ({
        url: "update/setting",
        method: "POST",
        body: data,
      }),
    }),


  }),
});

export const { useGetContactQuery,useUpdateSettingMutation } = contactAPI;
