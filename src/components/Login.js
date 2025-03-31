// forgot password
// need to check if user is already signed up
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../utils/Context";
import { createUser } from "../utils/API/UserAPI";
import {
  Button,
  CloseRoundedIcon,
  TextField,
  MenuItem,
  Dialog,
  Card,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";

function Login({ setLoginOpen, userStatus, setUserStatus, loginOpen }) {
  const location = useLocation();
  const { login, triggerLoading } = useUser();
  const navigate = useNavigate();

  const [signupPopup, setSignupPopup] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    location: "",
  });

  useEffect(
    function checkPathForAction() {
      if (location.pathname.includes("/invite")) {
        setUserStatus("Signup");
      }

      if (location.pathname.includes("/adminInvite")) {
        // TODO: set up logic to make user admin
        // if user exists, log them in, else sign them up
      }
    },
    [location.pathname]
  );

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (userData.password !== userData.password_confirmation) {
      alert("Passwords do not match");
      return;
    }
    if (userData.email === "") {
      alert("Please enter an email");
      return;
    }
    if (userData.password === "" || userData.password_confirmation === "") {
      alert("Please enter a password");
      return;
    }
    setSignupPopup(true);
    // setLoginOpen(false);
  };

  const handleFormToggle = () => {
    setUserStatus(userStatus === "Login" ? "Signup" : "Login");
  };

  const handleSubmit = async (e) => {
    if (e === "Login") {
      try {
        await login(userData.username, userData.password);
        triggerLoading();
        setLoginOpen(false);
        navigate(location.pathname);
      } catch (err) {
        alert("Invalid credentials");
        return;
      }
    } else if (e === "Register user") {
      // handleSignup();
      let missingFields = [];

      // Collect all the missing fields
      for (let key in userData) {
        if (userData[key] === "") {
          missingFields.push(key.replace("_", " "));
        }
      }
      // If any fields are missing, alert them
      if (missingFields.length > 0) {
        alert(
          `Please fill out the following fields: ${missingFields.join(", ")}`
        );
        return; // Exit the function early
      }
      console.log("userData.phone_number", typeof userData.phone_number);
      if (
        userData.phone_number.length !== 10 &&
        !/^\d{10}$/.test(userData.phone_number)
      ) {
        alert("Please enter a valid phone number");
        return;
      }
      console.log("Registering user", userData);
      // navigate("/profile");
      try {
        const user = await createUser(userData);
        console.log("User created", user);
        if (user === "Account successfully created") {
          navigate("/community");
        } else {
          alert("Error creating user");
        }
      } catch (err) {
        console.error("Error creating user", err);
        alert("Error creating user");
        return;
      }
    }
  };

  const cardStyle = {
    width: "90%",
    marginBottom: "1em",
    "& .MuiOutlinedInput-root": {
      color: "black",
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "var(--orange-light)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--orange)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiSelect-select": {
      color: "var(--orange)",
    },
  };

  return (
    <Dialog
      open={loginOpen}
      className="popup-overlay"
      onClose={() => setLoginOpen(false)}
      PaperComponent={Card}
    >
      {!signupPopup && (
        <div
          className="popup-card"
          style={{
            position: "relative",
            height: "30em",
            width: "22em",
          }}
        >
          <Button
            onClick={() => setLoginOpen(false)}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <CloseRoundedIcon style={{ color: "var(--orange)" }} />
          </Button>
          <article className="input" style={{ marginTop: "10px" }}>
            {userStatus === "Login" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("Login");
                }}
              >
                <label>Login</label>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  sx={{
                    marginTop: "2em",
                    ...cardStyle,
                  }}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  sx={{
                    ...cardStyle
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "var(--orange)", width: "90%" }}
                >
                  Login
                </Button>
              </form>
            )}

            {userStatus === "Signup" && (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // handleSubmit("Register user");
                    handleSignup();
                  }}
                >
                  <label>Signup</label>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    sx={{
                      marginTop: "2em",
                      ...cardStyle
                    }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    sx={{
                      ...cardStyle
                    }}
                  />
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    name="password_confirmation"
                    value={userData.password_confirmation}
                    onChange={handleChange}
                    sx={{
                      ...cardStyle
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "var(--orange)", width: "90%" }}
                  >
                    Signup
                  </Button>
                </form>
              </div>
            )}

            <Button
              type="button"
              onClick={handleFormToggle}
              style={{
                color: "var(--orange)",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              {userStatus === "Login"
                ? "Create an account"
                : "Already have an account?"}
            </Button>
          </article>
        </div>
      )}
      {signupPopup && (
        <div
          className="popup-card"
          style={{ position: "relative", height: "30em", width: "22em" }}
        >
          <Button
            onClick={() => {
              setSignupPopup(false);
              setLoginOpen(true);
            }}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <CloseRoundedIcon style={{ color: "var(--orange)" }} />
          </Button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("Register user");
            }}
          >
            <label>Register</label>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              sx={{
                marginTop: "2em",
              ...cardStyle
              }}
            />
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              sx={{
              ...cardStyle
              }}
            />
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              sx={{
              ...cardStyle
              }}
            />
            <TextField
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              type="tel"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleChange}
              sx={{
              ...cardStyle
              }}
            />
            <TextField
              id="outlined-select-state"
              select
              label="State"
              name="location"
              value={userData.location}
              onChange={handleChange}
              defaultValue="Select state"
              sx={{
              ...cardStyle
              }}
            >
              {states.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "var(--orange)", width: "90%" }}
            >
              Create Account
            </Button>
          </form>
        </div>
      )}
    </Dialog>
  );
}

export default Login;
