import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../utils/Context";

function Profile() {
  const { isAdmin, isAuth } = useUser();

  return (
    <>
      {isAuth && (
        <div className="card">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/settings"
          >
            <div>
              <img />
            </div>
            <h4>Username</h4>
          </Link>
        </div>
      )}
      <Link style={{ textDecoration: "none", color: "black" }} to="/goal">
        <div className="card">Goal page</div>
      </Link>
      <Link style={{ textDecoration: "none", color: "black" }} to="/community">
        <div className="card">Community page</div>
      </Link>
      {isAdmin && (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/dashboard"
        >
          <div className="card">Admin Dashboard</div>
        </Link>
      )}
    </>
  );
}

export default Profile;
