import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useUser } from "../utils/Context";

function Nav() {
  const {logout} = useUser();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout()
    localStorage.clear()
    navigate("/login")
  }

  return (
    <>
      {/* <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link> */}
      <Button onClick={handleLogout}>logout</Button>
    </>
  );
}

export default Nav;
