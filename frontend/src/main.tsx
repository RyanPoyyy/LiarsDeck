import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import Screens from "./routes/routes.tsx";
import Logo from "./components/Logo.tsx";
import VConsole from "vconsole";

if (process.env.NODE_ENV === "development") {
  new VConsole(); // Adds a console overlay on your app
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="">
      <Logo />
      <BrowserRouter>
        <Screens />
      </BrowserRouter>
    </div>
  </StrictMode>
);
