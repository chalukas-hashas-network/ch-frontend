// forgot password
// need to check if user is already signed up
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../utils/Context";
import { Button } from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";

function Login({openLogin}) {
  const location = useLocation();
  const { login, triggerLoading } = useUser();
  const navigate = useNavigate();

  const [signupPopup, setSignupPopup] = useState(false);
  const [userStatus, setUserStatus] = useState("Login");
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
      // if (location.pathname.startsWith("/login/invite/")) {
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
  };

  const handleFormToggle = () => {
    setUserStatus(userStatus === "Login" ? "Signup" : "Login");
  };

  const handleSubmit = async (e) => {
    if (e === "Login") {
      try {
        await login(userData.username, userData.password);
        triggerLoading();
        openLogin(false);
        navigate("/profile");
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
        navigate("/profile");
      } catch (err) {
        console.error("Error creating user", err);
        alert("Error creating user");
        return;
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h5 onClick={() => openLogin(false)}>X</h5>
        <article className="input" style={{ marginTop: "10px" }}>
          {userStatus === "Login" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("Login");
              }}
            >
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <Button type="submit">Login</Button>
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
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <br />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
                <br />
                <Button type="submit">Signup</Button>
              </form>
            </div>
          )}

          <Button type="button" onClick={handleFormToggle}>
            {userStatus === "Login"
              ? "Create an account"
              : "Already have an account?"}
          </Button>
        </article>
      </div>
      {signupPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <button onClick={() => setSignupPopup(false)}>X</button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("Register user");
              }}
            >
              <h1>Register</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={userData.first_name}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={userData.last_name}
                onChange={handleChange}
              />
              <br />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={userData.phone_number}
                onChange={handleChange}
              />
              <br />
              <select
                name="location"
                value={userData.location}
                onChange={handleChange}
              >
                <option value="">Select state</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <Button type="submit">Create Account</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
