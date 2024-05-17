import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbarLogIn",
  initialState: {
    value: localStorage.getItem("loggedInEmail"),
  },
  reducers: {
    login: (_, action) => {
      localStorage.setItem("loggedInEmail", action.payload);
      return { value: action.payload };
    },
    logout: (_, action) => {
      localStorage.removeItem("loggedInEmail");
      return { value: action.payload };
    },
  },
  selectors: {
    getLoginState: (state) => state.value,
  },
});

export const { login, logout } = navbarSlice.actions;
export const { getLoginState } = navbarSlice.selectors;
