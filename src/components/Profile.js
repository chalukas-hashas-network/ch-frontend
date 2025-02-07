import { useState } from "react";

function Profile() {
  const [admin, setAdmin] = useState(false);

  const navigator = (e) => {
    console.log(e);
  };

  return (
    <>
      <div class="card" onClick={(e) => navigator("settings")}>
        <div>
          <img />
        </div>
        <h4>Username</h4>
      </div>
      <div class="card" onClick={(e) => navigator("goal page")}>
        goal page
      </div>
      <div class="card" onClick={(e) => navigator("community page")}>
        community page
      </div>
      {admin && (
        <div class="card" onClick={(e) => navigator("admin dash page")}>
          admin dash page
        </div>
      )}
    </>
  );
}

export default Profile;
