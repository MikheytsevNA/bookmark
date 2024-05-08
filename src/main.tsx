import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <div>Navbar</div>
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <App /> },
      {
        path: "/search/:id",
        element: <div>Detailed book desc (lazy)</div>,
      },
      {
        path: "/signon",
        element: <div>Registration form</div>,
      },
      {
        path: "/signin",
        element: <div> log in form</div>,
      },
      {
        path: "/signout",
        element: <div> Sign out actions and redirect to </div>,
      },
      {
        path: "/history",
        element: <div> History list from LS</div>,
      },
      {
        path: "/favorites",
        element: <div> Favorite book list from LS (lazy)</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
