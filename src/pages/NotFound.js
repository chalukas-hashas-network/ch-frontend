import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <br />
      <h3>Uh Oh! You are lost.</h3>
      <br/>
      <p>This page you are looking for does not exist.</p>
      <Link style={{ textDecoration: "none", color: "blue" }} to="/home">
        {"HOME"}
      </Link>
    </div>
  );
}

export default NotFound;
