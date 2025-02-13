import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [admin, setAdmin] = useState(true);

  return (
    <>
      <div className="card">
        <Link style={{ textDecoration: "none", color: "black" }} to="/settings">
          <div>
            <img />
          </div>
          <h4>Username</h4>
        </Link>
      </div>
      <Link style={{ textDecoration: "none", color: "black" }} to="/goal">
        <div className="card">goal page</div>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="/community"
      >
        <div className="card">community page</div>
      </Link>
      {admin && (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/dashboard"
        >
          <div className="card">admin dash page</div>
        </Link>
      )}
    </>
  );
}

export default Profile;
