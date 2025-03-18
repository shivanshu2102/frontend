

import { createSlice } from "@reduxjs/toolkit";

// Get stored user data from localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const storedToken = localStorage.getItem("token") || null;

const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: storedUser ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
