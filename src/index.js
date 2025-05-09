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

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CommunityProvider>
        <UserProvider>
          <LoginProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LoginProvider>
        </UserProvider>
      </CommunityProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
