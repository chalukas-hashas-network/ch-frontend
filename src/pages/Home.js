import {
  Box,
  Typography,
  Button,
  TaskAltRoundedIcon,
} from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import { useUser, useLogin } from "../utils/Context";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import LiveUpdates from "../components/LiveUpdates";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useUser();
  const { setLoginOpen, setUserStatus } = useLogin();

  return (
    <Box style={{ marginTop: "3em" }}>
      <Logo community="Global" />
      <Nav />
      <Box
        className="pageDisplay"
        sx={{
          paddingLeft: "5%",
          paddingRight: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: { xs: "2em", md: "50px" },
        }}
      >
        <Box sx={{ color: "var(--brown)" }}>
          <Typography
            sx={{
              fontFamily: "Nexa, sans-serif",
              fontSize: "2rem",
              height: "35px",
            }}
          >
            United through learning
          </Typography>
          <Typography sx={{ fontFamily: "Nexa, sans-serif", fontSize: "2.1rem" }}>
            Chalukas Hashas
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".7rem",
              marginTop: ".5em",
            }}
          >
            <TaskAltRoundedIcon
              sx={{ marginRight: "7px", color: "var(--orange)" }}
            />{" "}
            Track your progress
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".7rem",
              marginTop: ".3em",
            }}
          >
            <TaskAltRoundedIcon
              sx={{ marginRight: "7px", color: "var(--orange)" }}
            />{" "}
            Connect with a Chavrusa
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".7rem",
              marginTop: ".3em",
            }}
          >
            <TaskAltRoundedIcon
              sx={{ marginRight: "7px", color: "var(--orange)" }}
            />{" "}
            Explore Community Events
          </Typography>
          {!isAuth && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                boxShadow: "none",
                marginTop: "20px",
                height: "3rem",
                width: "5.5rem",
                fontSize: ".7em",
                backgroundColor: "var(--brown)",
                borderRadius: "10px",
                textTransform: "none",
              }}
              onClick={() => {
                setLoginOpen(true);
                setUserStatus("Signup");
              }}
            >
              Sign up
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              height: "3rem",
              width: "11.5rem",
              fontSize: ".7em",
              marginTop: "20px",
              backgroundColor: "var(--orange)",
              marginLeft: "15px",
              borderRadius: "10px",
              textTransform: "none",
            }}
            onClick={() => navigate("/community")}
          >
            View Communities
          </Button>
        </Box>
        <LiveUpdates />
      </Box>
    </Box>
  );
}

export default Home;
