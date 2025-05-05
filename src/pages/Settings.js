import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "../utils/API/UserAPI";
import { useUser } from "../utils/context/UserContext";
import states from "../utils/dataExports/StatesExports";
import {
  Button,
  TextField,
  MenuItem,
  ArrowBackIcon,
} from "../utils/dataExports/muiExports";

function Settings() {
  const { user } = useUser();
  const { first_name, last_name, username, email, phone_number, location } =
    user;

  const navigate = useNavigate();
  /*
     required:
     username, email, 
     */

  const [userData, setUserData] = useState({
    // username: username,
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
        if (
          userData[key] === "" &&
          key !== "location" &&
          key !== "phone_number"
        ) {
          alert(`${key} cannot be empty`);
          return;
        }
        if (
          userData.phone_number !== "" &&
          userData.phone_number.length !== 10 &&
          !/^\d{10}$/.test(userData.phone_number)
        ) {
          alert("Please enter a valid phone number");
          return;
        }
        updatedFields[key] = userData[key];
      }
    }
    try {
      await updateUser(updatedFields);
      // TODO: return errors from fetch for API validations

      // update state
      for (let key in updatedFields) {
        user[key] = updatedFields[key];
      }
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div
      style={{
        paddingTop: "1em",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        sx={{
          textDecoration: "none",
          color: "var(--black)",
          position: "absolute",
          top: "1em",
          left: {xs: "1em", md: "20rem"},

        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </Button>
      <form
        onSubmit={submitUpdatedProfile}
        style={{
          width: "90%",
          marginTop: "3em",
          maxWidth: "400px",
          color: "var(--black)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <TextField
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleDataChange}
            sx={{
              marginTop: "2em",
              ...textFieldStyle,
            }}
          /> */}
        <TextField
          required
          id="first-name"
          label="First Name"
          variant="outlined"
          type="text"
          name="first_name"
          value={userData.first_name}
          onChange={handleDataChange}
        />
        <TextField
          required
          id="last-name"
          label="Last Name"
          variant="outlined"
          type="text"
          name="last_name"
          value={userData.last_name}
          onChange={handleDataChange}
        />
        <TextField
          required
          id="email"
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          value={userData.email}
          onChange={handleDataChange}
        />
        <TextField
          id="phone-number"
          label="Phone Number"
          variant="outlined"
          type="tel"
          name="phone_number"
          value={userData.phone_number}
          onChange={handleDataChange}
        />
        <TextField
          id="outlined-select-state"
          select
          label="State"
          name="location"
          value={
            userData.location === ""
              ? "Selected state"
              : capitalizeWord(userData.location)
          }
          onChange={handleDataChange}
          defaultValue={
            userData.location === ""
              ? "Selected state"
              : capitalizeWord(userData.location)
          }
        >
          <MenuItem value="">
            <em>Select State</em>
          </MenuItem>
          {states.map((state, index) => (
            <MenuItem key={index} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          sx={{
            boxShadow: "none",
            backgroundColor: "var(--brown)",
            textTransform: "none",
            borderRadius: "10px",
            height:"3rem",
            fontSize:".8em",
            width:"9rem",
            marginTop:"3em"
          }}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}

export default Settings;
