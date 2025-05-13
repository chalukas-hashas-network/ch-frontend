import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { LoginProvider } from "./utils/context/LoginContext.js";
import { UserProvider } from "./utils/context/UserContext.js";
import { CommunityProvider } from "./utils/context/CommunityContext.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/context/ThemeContext.js";
import React from "react";
import { TractateProvider } from "./utils/context/TractateContext.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <CommunityProvider>
            <TractateProvider>
              <LoginProvider>
                <App />
              </LoginProvider>
            </TractateProvider>
          </CommunityProvider>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
