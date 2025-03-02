import { Link } from "react-router-dom";
import Nav from "./Nav";
import { useUser } from "../utils/Context";
import { useState } from "react";
import Login from "./Login";

function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { isAuth } = useUser();

  const openLogin = (bool) => {
    setLoginOpen(bool);
  };

  return (
    <>
      {isAuth && (
        <div>
          <div>event banner</div>
          <Link
            style={{ textDecoration: "none", color: "black", width: "100px" }}
            to="/profile"
          >
            <div>logo</div>
          </Link>
          <Nav />
        </div>
      )}
      {!loginOpen && !isAuth && (
        <Link onClick={() => setLoginOpen(true)}>Login</Link>
      )}
      {loginOpen && <Login openLogin={openLogin} />}
    </>
  );
}

export default Home;
