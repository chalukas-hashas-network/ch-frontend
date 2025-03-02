import { ACCESS_TOKEN } from "../Authorization";

const API_URL = process.env.REACT_APP_API_URL;

const headers = {
  "Content-Type": "application/json",
};

export const getUser = async () => {
  // add params for added data in path
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_URL + "/me/?include_community=true", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};

export const findUserById = async (userId) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  // ! add path in route to include data

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_URL + `/user/${userId}/`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};

export const queryUsers = async (filterField, filterValue) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const response = await fetch(
      API_URL + `/admin-query/users/?by_${filterField}=${filterValue}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
    // setUser(data);  // Set the fetched user data
  } catch (err) {
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};

export const createUser = async (body) => {
  console.log("hit create user request");
  // hard code in body is_community_admin = false
  // body comes as an object, would need to add ^ to object before putting in body
  try {
    const response = await fetch(API_URL + "/user/register/", {
      method: "POST",
      // headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
    // setUser(data);  // Set the fetched user data
  } catch (err) {
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};

export const updateUser = async (body) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_URL + "/me/update/", {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
    // setUser(data);  // Set the fetched user data
  } catch (err) {
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};
