import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InterestPage from "./pages/InterestPage.tsx";
import AllInterestPage from "./pages/AllInterestPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/all-interest", element: <AllInterestPage /> },
  {
    path: "/interest/:interestName",
    element: <InterestPage />,
    errorElement: (
      <>
        ,<h1>Error 404 element not found</h1>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
