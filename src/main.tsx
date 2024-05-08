import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Navigation } from "./components/Navigation/Navigation.tsx";
import { SignIn } from "./components/SignIn/SignIn.tsx";
import { Logout } from "./components/Logout/Logout.tsx";
import { Favorites } from "./components/Favorites/Favorites.tsx";
import { History } from "./components/History/History.tsx";
import { logedInLoader } from "./util/logedInLoader.ts";
import { logedOutLoader } from "./util/logedOutLoader.ts";
import "./index.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <App /> },
      {
        path: "/books/:id",
        element: <div>Detailed book desc (lazy)</div>,
      },
      {
        path: "/search",
        element: <div>Search page</div>,
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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
