//  cd into parent backend run $python3 manage.py runserver
// TODO: input validations, error handling, update user state upon any edits

import Routing from "./utils/Routing";
import { useUser } from "./utils/context/UserContext";
import { useLocation } from "react-router-dom";
import Loading from "./components/Loading";
import { useEffect } from "react";
import Nav from "./components/Nav";

function App() {
  const location = useLocation();
  const { isLoading, triggerLoading } = useUser();

  useEffect(() => {
    const timeoutId = triggerLoading(1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  return (
    <div className="App">
      {location.pathname !== "/home" && location.pathname !== "/login" && <Nav />}
      <Loading />
      <Routing />
    </div>
  );
}

export default App;
