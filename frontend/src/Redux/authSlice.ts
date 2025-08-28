import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "../Interfaces/interface";

const initialState: { user: UserInfo | null } = {
  user: localStorage.getItem("chatter-user")
    ? JSON.parse(localStorage.getItem("chatter-user") as string)
    : null,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload;
      localStorage.setItem("chatter-user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("chatter-user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authUserReducer = authSlice.reducer;
