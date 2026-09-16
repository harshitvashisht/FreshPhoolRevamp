import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth/AuthProvider";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("FreshPhool root element was not found.");
}

createRoot(rootElement).render(
  React.createElement(AuthProvider, null, React.createElement(App)),
);
