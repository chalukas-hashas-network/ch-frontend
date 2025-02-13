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

const API_URL = process.env.REACT_APP_API_URL

export const getCommunities = async () => {
    console.log("hit get request")
    try {
        const response = await fetch(`${API_URL}/communities/`);
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