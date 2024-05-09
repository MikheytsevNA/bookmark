import { createSlice, configureStore } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbarLogIn",
  initialState: {
    value: null,
  },
  reducers: {
    login: (state, action) => ({ ...state, value: action.payload }),
    logout: (state) => ({ ...state, value: null }),
  },
});

export const store = configureStore({
  reducer: navbarSlice.reducer,
});

export const { login, logout } = navbarSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
