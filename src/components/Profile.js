import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [admin, setAdmin] = useState(false);

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
      <Link style={{ textDecoration: "none", color: "black" }} to="/goalPage">
        <div className="card">goal page</div>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="/communityPage"
      >
        <div className="card">community page</div>
      </Link>
      {admin && (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/adminDash"
        >
          <div className="card">admin dash page</div>
        </Link>
      )}
    </>
  );
}

export default Profile;
