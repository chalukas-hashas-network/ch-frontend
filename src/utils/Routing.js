import { Routes, Route } from "react-router-dom";
import Login from "../components/Login.js";
import Profile from "../components/Profile.js";
import Settings from "../components/Settings.js";
import AdminDash from "../components/AdminDash.js";
import Community from "../components/Community.js";
import Goal from "../components/Goal.js";
import { useUser } from "./Context.js";

export default function Routing() {
  const {isAdmin, isAuth} = useUser()

  return (
    <Routes>
      <Route path="/login/*" element={<Login />} />
      <Route path="/login/invite/:CommunityID" element={<Login />} />
      <Route path="/community" element={<Community />} />
      <Route path="/goal" element={<Goal />} />
      {isAuth ? (
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
      {isAdmin && <Route path="/dashboard" element={<AdminDash />} />}
      {/* <Route path="*" element={<NotFound />} /> */}
      {/* {isLoading && <Route path="*" element={<Loading />} />} */}
    </Routes>
  );
}
