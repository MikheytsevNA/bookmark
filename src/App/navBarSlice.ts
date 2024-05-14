import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbarLogIn",
  initialState: {
    value: localStorage.getItem("loggedInEmail"),
  },
  reducers: {
    login: (_, action) => ({ value: action.payload }),
    logout: (_, action) => ({ value: action.payload }),
  },
});

export const { login, logout } = navbarSlice.actions;
