// TODO: add edit logic, update API route and logic
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "../utils/API/UserAPI";
import { useUser } from "../utils/Context";

function Settings() {
  const { user } = useUser();
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    phone_number,
    location,
  } = user;

  const [usernameState, setUsernameState] = useState(username);
  const [emailState, setEmailState] = useState(email);
  const [firstNameState, setFirstNameState] = useState(first_name);
  const [lastNameState, setLastNameState] = useState(last_name);
  const [phoneNumberState, setPhoneNumberState] = useState(phone_number);
  const [locationState, setLocationState] = useState(location);
  // const [passwordState, setPasswordState] = useState(password);

  const handleUpdate = () => {
    updateUser({
      username: usernameState,
      email: emailState,
      // password: passwordState
    });
  };

  return (
    <>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      <div>
        <h1>Settings</h1>
        <lable>Username</lable>
        <input
          type="text"
          placeholder="Username"
          value={usernameState}
          onChange={(e) => setUsernameState(e.target.value)}
        />
        <br />
        <lable>Email</lable>
        <input
          type="text"
          placeholder="Email"
          value={emailState}
          onChange={(e) => setEmailState(e.target.value)}
        />
        <br />
        <lable>First Name</lable>
        <input
          type="text"
          placeholder="First Name"
          value={firstNameState}
          onChange={(e) => setFirstNameState(e.target.value)}
        />
        <br />
        <lable>Last Name</lable>
        <input
          type="text"
          placeholder="Last Name"
          value={lastNameState}
          onChange={(e) => setLastNameState(e.target.value)}
        />
        <br />
        <lable>Phone Number</lable>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumberState}
          onChange={(e) => setPhoneNumberState(e.target.value)}
        />
        <br />
        <lable>Location</lable>
        <input
          type="text"
          placeholder="Location"
          value={locationState}
          onChange={(e) => setLocationState(e.target.value)}
        />
        <br />
        {/* <input
          type="text"
          placeholder="Password"
          value={passwordState}
          onChange={(e) => setPasswordState(e.target.value)}
        /> */}
      </div>
      <button onClick={(e) => handleUpdate()}>edit</button>
    </>
  );
}

export default Settings;
