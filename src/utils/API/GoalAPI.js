import { ACCESS_TOKEN } from "../Authorization";

const API_URL = process.env.REACT_APP_API_URL;

const headers = {
  "Content-Type": "application/json",
};

export const createAnnualGoal = async (id, year) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_URL + "/goals/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user_id: id,
        year: year,
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

export const createTractateGoal = async (goal_id, tractate_id) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
      const response = await fetch(API_URL + "/goalTractates/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        goal_id: goal_id,
        tractate_id: parseInt(tractate_id),
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

export const getAllTractates = async () => {
  try {
    const response = await fetch(API_URL + "/tractates/");
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (e) {
    console.error("Error fetching tactates:", e);
  }
};

export const updateTractateProgress = async (goalId, page) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      // `${API_URL}/goal-tractate/update/${goalId}/`,
      `${API_URL}/goalTractates/${goalId}/`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({tractate_pages_completed: page}),
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
