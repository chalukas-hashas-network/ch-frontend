import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "./API/AuthAPI";

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

export const checkAuth = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    const decodedToken = jwtDecode(token);

    const tokenExpiration = decodedToken.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshAccessToken();
    } else {
      return;
    }
  }
};