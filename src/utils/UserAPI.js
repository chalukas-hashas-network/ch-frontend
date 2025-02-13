import { ACCESS_TOKEN } from "../Tokens";

const API_URL = process.env.REACT_APP_API_URL

const token = localStorage.getItem(ACCESS_TOKEN);


const headers = {
  "Content-Type": "application/json",
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}


export const getUser = async () => {
    console.log("hit get request")
    try {
        const response = await fetch(`${API_URL}/community/select/`, {method: "GET", headers});
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
} 
export const createUsers = async (body) => {
    console.log("hit get request")
    try {
        const response = await fetch(`${API_URL}`,{
            method: 'POST',
            headers,
            body: JSON.stringify({
              body
            })
          });
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
} 
export const updateUser = async (body) => {
    console.log("hit get request")
    try {
        const response = await fetch(`${API_URL}`,{
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              body
            })
          });
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
} 