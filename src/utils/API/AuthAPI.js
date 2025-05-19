import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Authorization";

const API_URL = process.env.REACT_APP_API_URL;

export const getAccessToken = async (username, password) => {
  try {
    const response = await fetch(API_URL + "/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await response.json();
    
    if (response.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
    }

    return response.status;
  } catch (error) {
    console.log("userLogin error: " + error);
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  try {
    const response = await fetch(API_URL + "/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    localStorage.setItem(ACCESS_TOKEN, data.access);
    return data;
  } catch (error) {
    console.log(error);
  }
};
