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
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/profile" element={<Profile />} />
          {isAuth && (
            <>
              <Route exact path="/goal" element={<Goal />} />
              <Route exact path="/settings" element={<Settings />} />
            </>
          )}
          {isAdmin && <Route exact path="/dashboard" element={<AdminDash />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
