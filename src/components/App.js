// (create json file and add your objects to it)
// add to "scripts" in package.json :
// "server": "json-server --watch db.json --port 3004"
// npm run server

//  cd into parent backend run $python3 manage.py runserver

import Home from "./Home";
import Routing from "../utils/Routing";
import { useUser } from "../utils/Context";
import Loading from "./Loading";
import { useEffect } from "react";

function App() {
  const { isLoading, triggerLoading } = useUser();

  useEffect(() => {
    triggerLoading();
  }, []);

  return (
    <div className="App">
      {!isLoading && <Home />}
      {isLoading ? <Loading /> : <Routing />}
    </div>
  );
}

export default App;
