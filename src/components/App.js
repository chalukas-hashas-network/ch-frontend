//  cd into parent backend run $python3 manage.py runserver
// TODO: input validations, error handling, update user state upon any edits
// ! when creating community, location is lowercase. only on community edit does it make it as uppercase.

import Routing from "../utils/Routing";
import { useUser } from "../utils/Context";
import Loading from "./Loading";
import { useEffect } from "react";
import Nav from "./Nav";

function App() {
  const { isLoading, triggerLoading } = useUser();

  useEffect(() => {
    triggerLoading();
  }, []);

  return (
    <div className="App" style={{backgroundColor: "#3d1515"}}>
      {!isLoading && <Nav />}
      {isLoading ? <Loading /> : <Routing />}
    </div>
  );
}

export default App;
