import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import setupRoter from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";

const router = setupRoter();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
