//  cd into parent backend run $python3 manage.py runserver
// TODO: input validations, error handling, update user state upon any edits

import Routing from "./utils/Routing";
import { useUser, useLogin } from "./utils/Context";
import { useLocation } from "react-router-dom";
import Login from "./components/Login";
import Loading from "./components/Loading";
import { useEffect } from "react";
import Nav from "./components/Nav";

function App() {
  const location = useLocation();
  const { isLoading, triggerLoading } = useUser();
  const { loginOpen, setLoginOpen } = useLogin();

  useEffect(() => {
    const timeoutId = triggerLoading(1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(
    function closeLoginIfPageChange() {
      setLoginOpen(false);
    },
    [location.pathname]
  );

  return (
    <div className="App">
      {location.pathname !== "/home" && <Nav />}
      <Loading />
      <Routing />
      {loginOpen && <Login />}
    </div>
  );
}

export default App;
