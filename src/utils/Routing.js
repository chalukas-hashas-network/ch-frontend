import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import Settings from "../pages/Settings.js";
import AdminDash from "../pages/AdminDash.js";
import Community from "../pages/Community.js";
import Goal from "../pages/Goal.js";
import { useUser } from "./context/UserContext";
import NotFound from "../pages/NotFound.js";

export default function Routing() {
  const { isAdmin, isAuth } = useUser();

  return (
    <Routes>
      <Route exact path="/community" element={<Community />} />
      <Route path="/home/*" element={<Home />} />
      {isAuth && (
        <>
          <Route exact path="/goal" element={<Goal />} />
          <Route exact path="/goal/settings" element={<Settings />} />
        </>
      )}
      {isAdmin && <Route exact path="/dashboard" element={<AdminDash />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
