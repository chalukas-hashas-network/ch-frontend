import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  AppBar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Toolbar,
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

  const pages = ["Home", "Goal", "Community", "Settings"];

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/home");
    // navigate("/login")
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* //* small nav bar */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Link
                variant="h6"
                noWrap
                style={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                to="/home"
              >
                LOGO
              </Link>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
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
                      <Typography sx={{ textAlign: "center" }}>
                        Log in
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setUserStatus("Signup");
                        setLoginOpen(true);
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        Sign up
                      </Typography>
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
                  color: "inherit",
                  textDecoration: "none",
                }}
                to="/home"
              >
                LOGO
              </Link>
              <Button
                key="Community Page"
                onClick={() => navigate("/community")}
              >
                Community Page
              </Button>
              {isAuth && (
                <>
                  <Button key="goal" onClick={() => navigate("/goal")}>
                    Goal Page
                  </Button>
                  <Button key="Settings" onClick={() => navigate("/settings")}>
                    Settings
                  </Button>
                </>
              )}
              {isAdmin && (
                <Button
                  key="Admin Dashboard"
                  onClick={() => navigate("/dashboard")}
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
                    borderLeft: "2px solid #D3D3D3",
                    height: "20px",
                    margin: "0 10px",
                  }}
                />
                {isAuth ? (
                  <Button
                    onClick={handleLogout}
                    sx={{ my: 2, color: "black", display: "block" }}
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
                      sx={{ color: "black" }}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setUserStatus("Signup");
                        setLoginOpen(true);
                      }}
                      sx={{ color: "black" }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {loginOpen && (
        <Login
          setLoginOpen={setLoginOpen}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
        />
      )}
    </>
  );
}

export default Nav;
