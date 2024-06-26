import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Face from "./components/Face/Face.tsx";
import { Navigation } from "./components/Navigation/Navigation.tsx";
import { SignIn } from "./components/SignIn/SignIn.tsx";
import { Logout } from "./components/Logout/Logout.tsx";
import { Favorites } from "./components/Favorites/Favorites.tsx";
import { History } from "./components/History/History.tsx";
import { logedInLoader } from "./util/logedInLoader.ts";
import { logedOutLoader } from "./util/logedOutLoader.ts";
import { Search } from "./components/Search/Search.tsx";
import { store } from "./App/store.ts";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const router = createBrowserRouter([
  {
    path: "/",
    Component: function App() {
      return (
        <>
          <Navigation />
          <main>
            <ErrorBoundary fallback={<div>Что-то пошло не так</div>}>
              <Outlet />
            </ErrorBoundary>
          </main>
        </>
      );
    },
    children: [
      { index: true, element: <Face /> },
      {
        path: "/books/:id",
        lazy: () => import("./components/Detailed/Detailed"),
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/signin",
        element: <SignIn />,
        loader: logedOutLoader,
      },
      {
        path: "/login",
        lazy: () => import("./components/Login/Login"),
      },
      {
        path: "/logout",
        element: <Logout />,
        loader: logedInLoader,
      },
      {
        path: "/history",
        element: <History />,
        loader: logedInLoader,
      },
      {
        path: "/favorites",
        element: <Favorites />,
        loader: logedInLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
