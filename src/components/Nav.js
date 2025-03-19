import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  MenuIcon,
} from "../utils/dataExports/muiExports";
import { useUser } from "../utils/Context";

import { useState } from "react";
import Login from "./Login";

function Nav() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [userStatus, setUserStatus] = useState("Login");
  const [loginOpen, setLoginOpen] = useState(false);
  const { logout, isAuth, isAdmin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/home");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ position: "fixed" }}>
        {/* //* small nav bar */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Link
            variant="h6"
            noWrap
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              position: "absolute",
              top: "1.5em",
            }}
            to="/home"
          >
            LOGO
          </Link>
          <IconButton
            size="large"
            onClick={handleOpenNavMenu}
            sx={{ color: "white", position: "absolute", right: "1em" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem>
              <Typography
                sx={{ textAlign: "center", color: "black" }}
                onClick={() => navigate("/home")}
              >
                Home
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography
                sx={{ textAlign: "center", color: "black" }}
                onClick={() => navigate("/community")}
              >
                Community
              </Typography>
            </MenuItem>

            {isAuth ? (
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    setUserStatus("Login");
                    setLoginOpen(true);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Log in</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setUserStatus("Signup");
                    setLoginOpen(true);
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Sign up</Typography>
                </MenuItem>
              </>
            )}
            {isAdmin && (
              <MenuItem onClick={() => navigate("/dashboard")}>
                <Typography sx={{ textAlign: "center" }}>
                  Admin Dashboard
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>

        {/* //* large nav bar */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Link
            variant="h5"
            noWrap
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              alignContent: "center",
              display: "relative",
              justifyContent: "flex-start",
              position: "absolute",
              top: "1.5em",
            }}
            to="/home"
          >
            LOGO
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
              margin: "0 10px",
              position: "absolute",
              right: "5em",
            }}
          >
            <Button
              key="Community Page"
              onClick={() => navigate("/community")}
              sx={{ color: "rgb(255, 255, 255)" }}
            >
              Community Page
            </Button>
            {isAuth && (
              <>
                <Button
                  key="goal"
                  onClick={() => navigate("/goal")}
                  sx={{ color: "rgb(255, 255, 255)" }}
                >
                  Goal Page
                </Button>
                <Button
                  key="Settings"
                  onClick={() => navigate("/settings")}
                  sx={{ color: "rgb(255, 255, 255)" }}
                >
                  Settings
                </Button>
              </>
            )}
            {isAdmin && (
              <Button
                key="Admin Dashboard"
                onClick={() => navigate("/dashboard")}
                sx={{ color: "rgb(255, 255, 255)" }}
              >
                Admin Dashboard
              </Button>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                margin: "0 10px",
              }}
            >
              <div
                style={{
                  borderLeft: "1px solid rgb(185, 108, 26)",
                  height: "20px",
                  margin: "0 10px",
                }}
              />
              {isAuth ? (
                <Button
                  onClick={handleLogout}
                  sx={{ color: "rgb(255, 255, 255)", display: "block" }}
                >
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setUserStatus("Login");
                      setLoginOpen(true);
                    }}
                    sx={{ color: "rgb(255, 255, 255)" }}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setUserStatus("Signup");
                      setLoginOpen(true);
                    }}
                    sx={{
                      backgroundColor: "var(--orange)",
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </Box>
        <div
          style={{
            borderBottom: "1px solid rgb(167, 167, 167)",
            width: "90%",
            margin: "3em auto",
          }}
        />
      </Container>
      {loginOpen && (
        <Login
          setLoginOpen={setLoginOpen}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
          loginOpen={loginOpen}
        />
      )}
    </>
  );
}

export default Nav;
