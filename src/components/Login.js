// forgot password
// need error handling if community doesn't exist (user changed url) 
// need to check if user is already signed up
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function Login() {
  const { userEmail, CommunityID } = useParams();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);
  const [newUser, setNewUser] = useState("Login");
  const [community, setCommunity] = useState(CommunityID);
  const [email, setEmail] = useState(userEmail);

  useEffect(() => {
    if (location.pathname.startsWith("/login/invite/")) {
      setNewUser("Signup");
    }
  }, [location.pathname]);

  const handleLogin = () => {
    console.log(newUser);
  };

  return (
    <>
      <nav style={{ marginTop: "3%" }}>
        <strong>Codify</strong>
      </nav>
      <article className="input" style={{ marginTop: "10px" }}>
        {newUser === "Signup" && (
          <>
            <input
              type="text"
              disabled
              placeholder="Community"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
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
        <button type="button" onClick={handleLogin}>
          {newUser}
          {/* nav to users profile*/}
        </button>
        <br />
        {/* {<h4 key={errors}>{errors}</h4>} */}
      </article>
    </>
  );
}

export default Login;
