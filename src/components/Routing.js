import { Routes, Route } from "react-router-dom";
// import Home from "./Home.js";
import Login from "./Login.js";
import Profile from "./Profile.js";
export default function Routing() {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login/*" element={<Login />} />
            <Route path="/login/invite/:userEmail/:CommunityID" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
 }