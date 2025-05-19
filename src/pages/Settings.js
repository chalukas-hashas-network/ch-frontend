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

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    // username: "",
    phone_number: "",
    first_name: "",
    last_name: "",
  });
  const [userData, setUserData] = useState({
    // username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    location: location,
  });

  const handleDataChange = (e) => {
    setErrorMessage((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
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
    const errors = {};

    for (let key in userData) {
      if (userData[key] !== user[key]) {
        if (
          userData[key] === "" &&
          key !== "location" &&
          key !== "phone_number"
        ) {
          errors[key] = `Please fill out your ${key.replace("_", " ")}`;
        }
        if (
          userData.phone_number !== "" &&
          userData.phone_number.length !== 10 &&
          !/^\d{10}$/.test(userData.phone_number)
        ) {
          errors.phone_number = "Please enter a valid phone number";
        }
        updatedFields[key] = userData[key];
      }
    }
    setErrorMessage((prev) => ({
      ...prev,
      ...errors,
    }));

    // If any fields are missing, exit the function early
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await updateUser(updatedFields);

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
          left: { xs: "2em", md: "15em" },
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
          error={errorMessage.first_name !== ""}
          helperText={errorMessage.first_name}
          id="first-name"
          label="*First Name"
          variant="outlined"
          type="text"
          name="first_name"
          value={userData.first_name}
          onChange={handleDataChange}
        />
        <TextField
          error={errorMessage.last_name !== ""}
          helperText={errorMessage.last_name}
          id="last-name"
          label="*Last Name"
          variant="outlined"
          type="text"
          name="last_name"
          value={userData.last_name}
          onChange={handleDataChange}
        />
        <TextField
          error={errorMessage.email !== ""}
          helperText={errorMessage.email}
          id="email"
          label="*Email"
          variant="outlined"
          type="text"
          name="email"
          value={userData.email}
          onChange={handleDataChange}
        />
        <TextField
          error={errorMessage.phone_number !== ""}
          helperText={errorMessage.phone_number}
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
            height: "3rem",
            fontSize: ".8em",
            width: "9rem",
            marginTop: "3em",
          }}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}

export default Settings;
