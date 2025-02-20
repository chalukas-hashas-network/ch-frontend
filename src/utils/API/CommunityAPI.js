// Community admin register setup.

// {
// communityAdmin: true,
// username: “Benny”,
// email: “benny@something.com”,
// phoneNumber: “717177171”,
// communityId: parseInt(1),
// password: “12345”,
// passwordConfirmation: “12345”
// }

// Regular user register
// {
// username: “Benny”,
// email: “benny@something.com”,
// phoneNumber: “717177171”,
// communityId: parseInt(1),
// password: “12345”,
// passwordConfirmation: “12345”
// }

const API_URL = process.env.REACT_APP_API_URL;

const headers = {
  "Content-Type": "application/json",
};

export const getCommunities = async () => {
  console.log("hit get request");
  try {
    const response = await fetch(API_URL + "/communities/");
    // Check if the response is OK
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
export const getCommunity = async (communityName) => {
  try {
    const response = await fetch(API_URL + "/communities/select");
    // Check if the response is OK
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

export const getAllCommunities = async () => {
  try {
    const response = await fetch(API_URL + "/communities/", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      // throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();

    // setUser(data);  // Set the fetched user data
  } catch (err) {
    console.log(err);
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};

export const createCommunity = async (name, location) => {
  try {
    const response = await fetch(API_URL + "/communities/create/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: name,
        location: location,
      }),
    });
    if (!response.ok) {
      // throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();

    // setUser(data);  // Set the fetched user data
  } catch (err) {
    console.log(err);
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};

export const updateCommunity = async (name, location, id) => {
  try {
    const response = await fetch(API_URL + "/communities/update/community_id/", {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        name: name,
        location: location,
      }),
    });
    if (!response.ok) {
      // throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();

    // setUser(data);  // Set the fetched user data
  } catch (err) {
    console.log(err);
    // setError(err.message);  // Set the error message
  } finally {
    // setLoading(false);  // Set loading to false once the fetch is complete
  }
};
