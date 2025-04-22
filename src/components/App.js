//  cd into parent backend run $python3 manage.py runserver
// TODO: input validations, error handling, update user state upon any edits

import Routing from "../utils/Routing";
import { useUser, useLogin } from "../utils/Context";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Loading from "./Loading";
import { useEffect } from "react";
import Nav from "./Nav";

function App() {
  const location = useLocation();
  const { isLoading, triggerLoading } = useUser();
  const { loginOpen, setLoginOpen } = useLogin();

  useEffect(() => {
    triggerLoading();
  }, []);

  useEffect(
    function closeLoginIfPageChange(){
      setLoginOpen(false)
    }, [location.pathname]
  )

  return (
    <div className="App">
      {!isLoading && <Nav />}
      {isLoading ? <Loading /> : <Routing />}
      {loginOpen && <Login />}
    </div>
  );
}

export default App;
