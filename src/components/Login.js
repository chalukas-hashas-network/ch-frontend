// forgot password
// need to check if user is already signed up
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useUser } from "../utils/Context";
import Button from "@mui/material/Button";

function Login() {
  const { CommunityID } = useParams();
  const location = useLocation();
  const { login } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userStatus, setUserStatus] = useState("Login");
  const [community, setCommunity] = useState(CommunityID || "");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.pathname.startsWith("/login/invite/")) {
      setUserStatus("Signup");
    }
  }, [location.pathname]);

  const handleLogin = () => {
    login(username, password).then(() => {
      navigate("/profile");
    });
  };

  const handleSignup = () => {
    console.log("signing up");
  };

  const handleFormToggle = () => {
    if (userStatus === "Login") {
      setUserStatus("Signup");
    } else {
      setUserStatus("Login");
    }
  };

  return (
    <>
      <nav style={{ marginTop: "3%" }}>
        <strong>Codify</strong>
      </nav>
      <article className="input" style={{ marginTop: "10px" }}>
        {userStatus === "Signup" && (
          <form>
            <input
              type="text"
              placeholder="Community"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {userStatus === "Login" ? (
          <Button type="button" onClick={handleLogin}>
            {userStatus}
            {/* nav to users profile */}
          </Button>
        ) : (
          <Button type="button" onClick={handleSignup}>
            {userStatus}
            {/* nav to users profile */}
          </Button>
        )}
        <br />
        {/* {<h4 key={errors}>{errors}</h4>} */}
        <Button type="button" onClick={handleFormToggle}>
          {userStatus === "Login"
            ? "Create an account"
            : "Already have an account?"}
        </Button>
      </article>
    </>
  );
}

export default Login;
