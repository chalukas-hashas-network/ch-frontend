// (create json file and add your objects to it)
// add to "scripts" in package.json :
// "server": "json-server --watch db.json --port 3004"
// npm run server

import Routing from "./Routing";

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
