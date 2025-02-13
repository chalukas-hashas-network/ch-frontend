import { Link } from "react-router-dom";
import Community from "./Community";

function AdminDash() {
  const admins = [
    {
      name: "benny",
      Community: "crown heights",
      email: "benny@email.com",
      phone: "1234567890"
    },
  ];
  
  return (
    <>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      {/* name, email, community */}
 <div style={{display: "flex", flexDirection: "column"}}>

          {admins.map((a, i) => (
            <>
              <tr>{a.name}</tr>
              <tr>{a.Community}</tr>
              <tr>{a.email}</tr>
              <tr>{a.phone}</tr>
            </>
          )
        )}

        </div>
    </>
  );
}

export default AdminDash;
