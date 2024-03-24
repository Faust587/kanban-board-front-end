import React from "react";
import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import App from "./App.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store.ts";
import { ErrorProvider } from "./shared/providers";
import { GlobalThemeProvider } from "./shared/providers";

import "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <GlobalThemeProvider>
        <ErrorProvider />
        <Reset />
        <App />
      </GlobalThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
