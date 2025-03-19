// forgot password
// need to check if user is already signed up
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../utils/Context";
import {
  Button,
  CloseRoundedIcon,
  TextField,
  MenuItem,
  Dialog,
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
    confirmPassword: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    location: "",
  });

  useEffect(() => {
    if (location.pathname.includes("/invite")) {
      setUserStatus("Signup");
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (userData.email === "") {
      alert("Please enter an email");
      return;
    }
    if (userData.password === "" || userData.confirmPassword === "") {
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
        navigate("/home");
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
      console.log("Registering user", userData);
      // navigate("/profile");
      try {
        // const user = await createUser(userData);
        // console.log("User created", user);
        navigate("/home");
      } catch (err) {
        console.error("Error creating user", err);
        alert("Error creating user");
        return;
      }
    }
  };

  return (
    <Dialog open={loginOpen} className="popup-overlay" style={{borderRadius: "20px"}}>
      {!signupPopup && (
        <div
          className="popup-card"
          style={{ position: "relative", height: "30em", width: "22em", borderRadius: "20px" }}
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
                  style={{
                    width: "100%",
                    marginBottom: "1em",
                    marginTop: "2em",
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
                  style={{ width: "100%", marginBottom: "1em" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "var(--orange)", width: "100%" }}
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
                    style={{
                      width: "100%",
                      marginBottom: "1em",
                      marginTop: "2em",
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
                    style={{ width: "100%", marginBottom: "1em" }}
                  />
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "1em" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "var(--orange)", width: "100%" }}
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
              style={{ width: "100%", marginBottom: "1em", marginTop: "2em" }}
            />
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "1em" }}
            />
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "1em" }}
            />
            <TextField
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              type="tel"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: "1em" }}
            />
            <TextField
              id="outlined-select-state"
              select
              label="State"
              name="location"
              value={userData.location}
              onChange={handleChange}
              defaultValue="Select state"
              style={{ width: "100%", marginBottom: "1em" }}
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
              style={{ backgroundColor: "var(--orange)", width: "100%" }}
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
