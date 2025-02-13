import { Link } from "react-router-dom";

function Community() {
  return (
    <>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
    </>
  );
}

export default Community;
