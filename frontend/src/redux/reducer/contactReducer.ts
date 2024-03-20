import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/api";
import { InitialUserState } from "../../types/types";

// Define initial state
const userInit: InitialUserState = {
  user: null,
  isLoading: false,
};

export const userReducer = createSlice({ 
  name: "userReducer",
  initialState: userInit,
  reducers: {
    // Action to set user information and token
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    // Action to reset user information and token
    resetUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

// Export actions
export const { setUser, resetUser } = userReducer.actions;
