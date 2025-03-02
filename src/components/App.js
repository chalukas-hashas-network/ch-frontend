// (create json file and add your objects to it)
// add to "scripts" in package.json :
// "server": "json-server --watch db.json --port 3004"
// npm run server

//  cd into parent backend run $python3 manage.py runserver

import Routing from "../utils/Routing";
import { useUser } from "../utils/Context";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import Login from "../pages/Login";
import Nav from "./Nav";
import { Link } from "react-router-dom";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { isAuth, isLoading, triggerLoading } = useUser();

  useEffect(() => {
    triggerLoading();
  }, []);

  const openLogin = (bool) => {
    setLoginOpen(bool);
  };

  return (
    <div className="App">
      {!isLoading && (
        <>
          {isAuth && (
            <div>
              <div>event banner</div>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100px",
                }}
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
      )}
      {isLoading ? <Loading /> : <Routing />}
    </div>
  );
}

export default App;
