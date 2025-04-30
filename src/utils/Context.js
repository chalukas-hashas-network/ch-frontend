import { createContext, useState, useContext, useEffect } from "react";
import { getUser, createUser } from "./API/UserAPI";
import { getAccessToken } from "./API/AuthAPI";
import { checkAuth } from "./Authorization";

const UserContext = createContext();
const LoginContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    location: null,
    is_community_admin: false,
    is_superuser: false,
    goal: null,
    community: null,
  });

  const fetchUser = async () => {
    const userData = await getUser();

    console.log("userData: ", JSON.stringify(userData, null, 2));

    if (userData !== undefined) {
      setIsAuth(true);
      setUser(userData);
      if (userData?.is_superuser) {
        setIsAdmin(true);
        setIsSuperAdmin(true);
      } else if (userData?.is_community_admin) {
        setIsAdmin(true);
      }
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    triggerLoading();
    checkAuth().then(() => fetchUser());
  }, []);

  const login = async (username, password) => {
    const res = await getAccessToken(username, password);

    if (res != null) {
      fetchUser();
    }
  };

  const signup = async (userData) => {
    //? what can be wrong with fields?
    // needed for if i want to error handle from backend or keep it in frontend
    const newUser = await createUser(userData);
    if (newUser != null) {
      fetchUser();
    }
  };

  const triggerLoading = (time) => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, time);

    return timeoutId;
  };

  const logout = () => {
    setIsAuth(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setUser({
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      phone_number: null,
      location: null,
      is_community_admin: false,
      is_superuser: false,
      goal: null,
      community: null,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuth,
        isAdmin,
        isSuperAdmin,
        signup,
        isLoading,
        setIsLoading,
        triggerLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

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
