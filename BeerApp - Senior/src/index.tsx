import React from "react";
import ReactDOM from "react-dom/client";
import { FavouriteBeersProvider } from "./context/FavouriteBeersContext";
import Router from "./router";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";
import "./styles/global.css";
import { register } from "./serviceWorker";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <FavouriteBeersProvider>
        <Router />
      </FavouriteBeersProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
register();
