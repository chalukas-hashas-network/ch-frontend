import { Routes, Route } from "react-router-dom";
// import Home from "./Home.js";
import Login from "./Login.js";
import Profile from "./Profile.js";
import Settings from "./Settings.js";

export default function Routing() {
    const auth = true;
    const admin = false;
    
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login/*" element={<Login />} />
            <Route path="/login/invite/:userEmail/:CommunityID" element={<Login />} />
            {auth && (
                <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                {/* {admin && (
                    <Route path="dashboard" element={<Dashboard/>} />
                )} */}
                </>
            )}
            {/* <Route path="*" element={<NotFound />} /> */}

        </Routes>
    );
 }