import { Routes, Route } from "react-router-dom";
// import Home from "./Home.js";
import Login from "./Login.js";
import Profile from "./Profile.js";
import Settings from "./Settings.js";
import AdminDash from "./AdminDash.js";
import Community from "./Community.js";
import Goal from "./Goal.js";

export default function Routing() {
  const auth = true;
  const admin = true;

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login/*" element={<Login />} />
      <Route path="/login/invite/:CommunityID" element={<Login />} />
      {/* <Route path="/login/invite/:userEmail/:CommunityID" element={<Login />} /> */}
      <Route path="/community" element={<Community />} />
      <Route path="/goal" element={<Goal />} />
      {auth ? (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </>
      ) : (
        <>
          <Route path="/profile" element={<Login />} />
          <Route path="/settings" element={<Login />} />
        </>
      )}
      {admin && <Route path="/dashboard" element={<AdminDash />} />}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
