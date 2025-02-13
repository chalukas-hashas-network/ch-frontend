import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

function Authorization() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      // post request with refresh token in body[refresh: refreshToken]
      // if res.ok set localStorage.setItem(ACCESS_TOKEN, res.data.access)
      // setIsauth(true) else setIsAuth(false)
    } catch (error) {
      console.log("Refresh error: " + error);
      setIsAuthorized(false);
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decodedToken = jwtDecode(token);

    const tokenExpiration = decodedToken.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };
}

export default Authorization;
