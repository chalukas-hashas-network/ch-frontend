import { Routes, Route } from "react-router-dom";
import Login from "../components/Login.js";
import Profile from "../components/Profile.js";
import Settings from "../components/Settings.js";
import AdminDash from "../components/AdminDash.js";
import Community from "../components/Community.js";
import Goal from "../components/Goal.js";
import { useUser } from "./Context.js";
import NotFound from "../components/NotFound.js";

export default function Routing() {
  const { isAdmin, isAuth, isLoading } = useUser();

  return (
    <>
      {!isLoading && (
        <Routes>
          <Route path="/login/*" element={<Login />} />
          <Route exact path="/login/invite/:CommunityID" element={<Login />} />
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/goal" element={<Goal />} />
          {isAuth ? (
            <>
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/settings" element={<Settings />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Login />} />
              <Route path="/settings" element={<Login />} />
            </>
          )}
          {isAdmin && <Route exact path="/dashboard" element={<AdminDash />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
