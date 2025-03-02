import { Link } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "../utils/API/UserAPI";
import { useUser } from "../utils/Context";
import states from "../utils/dataExports/StatesExports";

function Settings() {
  const { user } = useUser();
  const { first_name, last_name, username, email, phone_number, location } =
    user;

  const [userData, setUserData] = useState({
    username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    location: location,
  });

  const handleDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  
  function capitalizeWord(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(' ');
  }

  const submitUpdatedProfile = async (e) => {
    e.preventDefault();
    const updatedFields = {};
    for (let key in userData) {
      if (userData[key] !== user[key]) {
        if (userData[key] === "") {
          alert(`${key} cannot be empty`);
          return;
        }
        updatedFields[key] = userData[key];
      }
    }
    try {
      await updateUser(updatedFields);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      <form onSubmit={submitUpdatedProfile}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleDataChange}
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={userData.first_name}
            onChange={handleDataChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={userData.last_name}
            onChange={handleDataChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleDataChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={userData.phone_number}
            onChange={handleDataChange}
          />
        </label>
        <br />
        <label>
          State:
          <select
            value={capitalizeWord(userData.location)}
            name="location"
            onChange={handleDataChange}
          >
            <option value="">Select state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <br />
        <input type="submit" value="Update Profile" />
      </form>
    </>
  );
}

export default Settings;
