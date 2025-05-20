import { ACCESS_TOKEN } from "../Authorization";

const API_URL = process.env.REACT_APP_API_URL;

const headers = {
  "Content-Type": "application/json",
};

export const getCommunities = async (filterField = {}, includeFields = []) => {
  let url = API_URL + "/communities/?";
  const queryParams = [];

  // Add the filter parameter to the query string if it's provided
  for (const [key, value] of Object.entries(filterField)) {
    queryParams.push(`by_${key}=${value}`);
  }

  // Add each include parameter to the query string
  includeFields.forEach((field) => {
    queryParams.push(`include_${field}=true`);
  });

  if (queryParams.length > 0) {
    url += queryParams.join("&");
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error getting community: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const queryCommunities = async (
  filterField = {},
  includeFields = []
) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  let url = API_URL + "/admin/communities/?";
  const queryParams = [];

  // Add the filter parameter to the query string if it's provided
  for (const [key, value] of Object.entries(filterField)) {
    queryParams.push(`by_${key}=${value}`);
  }

  // Add each include parameter to the query string
  includeFields.forEach((field) => {
    queryParams.push(`${field}=true`);
  });

  // If there are query parameters, append them to the URL
  if (queryParams.length > 0) {
    url += queryParams.join("&");
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error getting community: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// export const getAllCommunities = async () => {
//   try {
//     const response = await fetch(API_URL + "/communities/", {
//       method: "GET",
//       headers: headers,
//     });
//     if (!response.ok) {
//       // throw new Error(`Error: ${response.statusText}`);
//     }

//     return await response.json();

//     // setUser(data);  // Set the fetched user data
//   } catch (err) {
//     console.log(err);
//     // setError(err.message);  // Set the error message
//   } finally {
//     // setLoading(false);  // Set loading to false once the fetch is complete
//   }
// };

export const createCommunity = async (body) => {
  try {
    const response = await fetch(API_URL + "/admin/communities/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: body?.name,
        location: body?.location,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error creating community: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateCommunity = async (body) => {
  try {
    const response = await fetch(
      API_URL + "/admin/communities/" + body.id + "/",
      {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          name: body.name,
          location: body.location,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Error updating community: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteCommunity = async (id) => {
  try {
    const response = await fetch(API_URL + "/admin/communities/" + id + "/", {
      method: "DELETE",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Error deleting community: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const createAdmin = async (user_id, community_id) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_URL + "/admin/communityAdmins/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user_id: user_id,
        community_id: community_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error creating admin: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
