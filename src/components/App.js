// (create json file and add your objects to it)
// add to "scripts" in package.json :
// "server": "json-server --watch db.json --port 3004"
// npm run server

//  cd into parent backend run $python3 manage.py runserver

import Home from "./Home";
import Routing from "./Routing";
import {getUser} from "../util.js/UserAPI"


function App() {
  const handleClick = ()=>{
      console.log(getUser())
  }
  const auth = true;
  return (
    <div className="App">
      <div onClick={(e)=> handleClick()}>hello</div>
      {auth && <Home />}
      <Routing />
    </div>
  );
}

export default App;
