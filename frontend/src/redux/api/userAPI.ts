import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthUser,
  ForgotUser,
  LoginResponse,
  MessageResponse,
} from "../../types/api";
import Cookies from "js-cookie";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/v1/user",
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get token from the state
      const token = Cookies.get("token") || localStorage.getItem("token");

      if (token) {
        // If token exists, set it in the headers
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, AuthUser>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    forgot: builder.mutation<LoginResponse, ForgotUser>({
      query: (data) => ({
        url: "/forgot",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<MessageResponse, AuthUser>({
      query: (data) => ({
        url: "/logout",
        method: "POST",
        body: data,
      }),
    }),

    setUserRole: builder.mutation({
      query: (data) => ({
        url: "/role",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// Accessing the signup, signupFinish, and setUserRole mutations
export const { useLoginMutation,useForgotMutation, useSetUserRoleMutation } = userAPI;
