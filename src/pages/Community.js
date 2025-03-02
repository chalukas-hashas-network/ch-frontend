import { Link } from "react-router-dom";

function Community() {
  return (
    <>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      {/* dropdown for select all communities, default is users community (think of default for visitor) */}
    </>
  );
}

export default Community;
