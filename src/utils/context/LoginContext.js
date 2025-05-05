import { useState, useContext, createContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [userStatus, setUserStatus] = useState("Login");
  
    return (
      <LoginContext.Provider
        value={{
          userStatus,
          setUserStatus,
        }}
      >
        {children}
      </LoginContext.Provider>
    );
  };
  
  export const useLogin = () => {
    return useContext(LoginContext);
  };
  