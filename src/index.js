import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App.js";
import reportWebVitals from "./reportWebVitals.js";
import { UserProvider, LoginProvider } from "./utils/Context";

const root = createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <LoginProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginProvider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
