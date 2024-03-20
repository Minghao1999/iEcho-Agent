import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {  ContactResponse } from "../../types/api";


export const contactAPI = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/v1/chat",
    prepareHeaders: (headers) => {
      // Get token from the state
      const token = Cookies.get("token") || localStorage.getItem("token");
      console.log("Toke", token);
      if (token) {
        // If token exists, set it in the headers
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getContact: builder.query<ContactResponse,null>({
      query: () => ({
        url: "/contact/get",
        credentials: "include",
        method: "GET",
      }),
    }),


  }),
});

export const { useGetContactQuery } = contactAPI;
