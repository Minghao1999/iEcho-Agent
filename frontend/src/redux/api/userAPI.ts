import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthUser,
  ForgotUser,
  LoginResponse,
  MessageResponse,
  ResetPasswordQuery,
  ResetPasswordResponse,
} from "../../types/api";
import Cookies from "js-cookie";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_IP}/api/v1/user`,
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

    reset: builder.mutation<ResetPasswordResponse, ResetPasswordQuery>({
      query: (data) => ({
        url: "/forgot-finish",
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation<MessageResponse, "">({
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

export const getUserInfo = async () => {
  try {
    const token = Cookies.get('token') || localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.get('http://127.0.0.1:5000/api/v1/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data;
    console.log('User Data:', userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Accessing the signup, signupFinish, and setUserRole mutations
export const { useLoginMutation,useLogoutMutation,useForgotMutation,useResetMutation, useSetUserRoleMutation } = userAPI;
