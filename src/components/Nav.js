import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  IconButton,
  Typography,
  Container,
  MenuIcon,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
  Drawer,
} from "../utils/dataExports/muiExports";
import { useUser } from "../utils/Context";

import { useState } from "react";
import Login from "./Login";

function Nav() {
  const [userStatus, setUserStatus] = useState("Login");
  const [loginOpen, setLoginOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout, isAuth, isAdmin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/home");
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
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "white", position: "absolute", right: "1em" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} anchor="right">
            <Box sx={{ width: 250 }} role="presentation">
              <List>
                <ListItem disablePadding key="home">
                  <ListItemButton
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate("/home");
                    }}
                  >
                    {/* <ListItemButton onClick={() => setDrawerOpen(false)} and navigate to the page> */}
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="community">
                  <ListItemButton
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate("/community");
                    }}
                  >
                    <ListItemText primary="Community Page" />
                  </ListItemButton>
                </ListItem>
                {isAuth ? (
                  <>
                    <ListItem disablePadding key="goal">
                      <ListItemButton
                        onClick={() => {
                          setDrawerOpen(false);
                          navigate("/goal");
                        }}
                      >
                        <ListItemText primary="Goal Page" />
                      </ListItemButton>
                    </ListItem>
                    {isAdmin && (
                      <ListItem disablePadding key="admin">
                        <ListItemButton
                          onClick={() => {
                            setDrawerOpen(false);
                            navigate("/dashboard");
                          }}
                        >
                          <ListItemText primary="Admin Dashboard" />
                        </ListItemButton>
                      </ListItem>
                    )}
                    <ListItem disablePadding key="settings">
                      <ListItemButton
                        onClick={() => {
                          setDrawerOpen(false);
                          navigate("/settings");
                        }}
                      >
                        <ListItemText primary="Settings" />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" />
                    <ListItem disablePadding key="logout">
                      <ListItemButton
                        onClick={() => {
                          setDrawerOpen(false);
                          handleLogout();
                        }}
                      >
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <Divider variant="middle" />
                    <ListItem disablePadding key="login">
                      <ListItemButton
                        onClick={() => {
                          setUserStatus("Login");
                          setLoginOpen(true);
                        }}
                      >
                        <ListItemText primary="Log in" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding key="signup">
                      <ListItemButton
                        onClick={() => {
                          setUserStatus("Signup");
                          setLoginOpen(true);
                        }}
                      >
                        <ListItemText primary="Sign up" />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
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
              key="goal"
              onClick={() => navigate("/home")}
              sx={{ color: "rgb(255, 255, 255)" }}
            >
              Home
            </Button>
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
                {isAdmin && (
                  <Button
                    key="Admin Dashboard"
                    onClick={() => navigate("/dashboard")}
                    sx={{ color: "rgb(255, 255, 255)" }}
                  >
                    Admin Dashboard
                  </Button>
                )}
              </>
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
