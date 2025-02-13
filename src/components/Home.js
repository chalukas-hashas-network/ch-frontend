import { Link } from "react-router-dom";
import Nav from "./Nav";

function Home() {
    return ( <>
    <div>event banner</div>
    <Link style={{ textDecoration: "none", color: "black", width: "100px" }} to="/profile">
    <div>logo</div>
    </Link>
    <Nav />
    </> );
}

export default Home;