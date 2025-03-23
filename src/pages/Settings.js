import { Link } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "../utils/API/UserAPI";
import { useUser } from "../utils/Context";
import states from "../utils/dataExports/StatesExports";
import { Button, TextField, MenuItem } from "../utils/dataExports/muiExports";

function Settings() {
  const { user } = useUser();
  const { first_name, last_name, username, email, phone_number, location } =
    user;

    /*
     required:
     username, email, 
     */

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
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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
      // alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div style={{ color: "white", paddingTop: "100px"}}>
      <Link style={{ textDecoration: "none", color: "white" }} to="/home">
        {"< Back"}
      </Link>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={submitUpdatedProfile} style={{color: "white"}}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleDataChange}
            sx={{ width: "90%", marginBottom: "1em", marginTop: "2em", 
              //  "& .MuiOutlinedInput-root": {
              // backgroundColor: "white",
              // "&.Mui-focused fieldset": {
              //   borderColor: "black"
              // },
               "& input": {
                color: "white"
              // }
            }}}
          />
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleDataChange}
            sx={{ width: "90%", marginBottom: "1em", "& input": {
                color: "white"
              } }}
          />
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleDataChange}
              sx={{ width: "90%", marginBottom: "1em", "& input": {
                color: "white"
              } }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="text"
            name="email"
            value={userData.email}
            onChange={handleDataChange}
              sx={{ width: "90%", marginBottom: "1em", "& input": {
                color: "white"
              } }}
          />
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            type="tel"
            name="phone_number"
            value={userData.phone_number}
            onChange={handleDataChange}
              sx={{ width: "90%", marginBottom: "1em", "& input": {
                color: "white"
              } }}
          />
          <TextField
            id="outlined-select-state"
            select
            label="State"
            name="location"
            value={capitalizeWord(userData.location)}
            onChange={handleDataChange}
            defaultValue="Select state"
            sx={{ width: "90%", marginBottom: "1em", "& input": {
                color: "white"
              } }}
          >
            <MenuItem value="Select state">Select state</MenuItem>
            {states.map((state, index) => (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "var(--orange)", width: "90%", "& input": {
                color: "white"
              } }}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
