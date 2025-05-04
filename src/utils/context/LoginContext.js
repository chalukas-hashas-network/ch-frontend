import { useState, useContext, createContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [userStatus, setUserStatus] = useState("Login");
    const [loginOpen, setLoginOpen] = useState(false);
  
    return (
      <LoginContext.Provider
        value={{
          userStatus,
          setUserStatus,
          loginOpen,
          setLoginOpen,
        }}
      >
        {children}
      </LoginContext.Provider>
    );
  };
  
  export const useLogin = () => {
    return useContext(LoginContext);
  };
  