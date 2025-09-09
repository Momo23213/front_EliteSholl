import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // pas besoin de .tsx, Vite résout automatiquement
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
