import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { navbarSlice } from "./navBarSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(navbarSlice.actions.login, navbarSlice.actions.logout),
  effect: async (action) => {
    if (action.type === "navbarLogIn/logout") {
      console.log(`Пользователь ${action.payload} разлогинился`);
    } else {
      console.log(`Пользователь ${action.payload} залогинился`);
    }
  },
});

export const store = configureStore({
  reducer: {
    navbar: navbarSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      listenerMiddleware.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
