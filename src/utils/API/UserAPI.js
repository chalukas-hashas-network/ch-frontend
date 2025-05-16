import { ACCESS_TOKEN } from "../Authorization";

const API_URL = process.env.REACT_APP_API_URL;

const headers = {
  "Content-Type": "application/json",
};

export const getUser = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      API_URL +
        "/me/?include_community=true&include_goal=true&include_goal_tractates=true",
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.log("Error getting user: ", err);
  }
};

export const findUserById = async (userId) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  // ! add path in route to include data

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const response = await fetch(
      API_URL + `/user/${userId}/?include_goal=true&include_community=true`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.log("Error finding user: ", err);
  }
};

export const queryUsers = async (filters = {}) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let url = `${API_URL}/admin/users/`;

  // Dynamically add query parameters if there are any filters
  const queryParams = [];
  for (const [key, value] of Object.entries(filters)) {
    queryParams.push(`by_${key}=${value}`);
  }

  // If there are query parameters, join them with '&' and append to URL
  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log("Error querying users: ", err);
  }
};

export const createUser = async (body) => {
  // TODO: updated context isAuth = true
  // cant call user context from here, return success message and update context where fetch is called
  console.log("hit create user request");
  // body["community_id"] = 20;
  // hard code in body is_community_admin = false
  // body comes as an object, would need to add ^ to object before putting in body
  try {
    const response = await fetch(API_URL + "/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log("Error creating user: ", err);
    // TODO: error messages if arent unique
    //   {
    //     "username": [
    //         "A user with that username already exists."
    //     ],
    //     "email": [
    //         "Email is already taken."
    //     ],
    //     "phone_number": [
    //         "Phone number is already taken."
    //     ]
    // }
  }
};

export const updateUser = async (body) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_URL + "/me/", {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
    // setUser(data);  // Set the fetched user data
    // error handling:
    // {"email":["Email is already taken."]}
    // {"email":["Enter a valid email address."]}
  } catch (err) {
    console.log("Error updating user: ", err);
  }
};
