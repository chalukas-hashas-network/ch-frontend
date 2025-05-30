import { Box, Typography, Button } from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../utils/context/LoginContext";
import { useUser } from "../utils/context/UserContext";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import LiveUpdates from "../components/LiveUpdates";
import check from "../assets/images/Check icon Chalukas .png";
import DataBoxesDisplay from "../components/DataBoxesDisplay";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useUser();
  const { setUserStatus } = useLogin();

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
        <Box sx={{ color: "var(--brown)", marginBottom: "2rem" }}>
          <Typography
            noWrap
            sx={{
              fontSize: "2rem",
              fontFamily: "Nexa, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            United through learning
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: "2rem",
              fontFamily: "Nexa, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Chalukas Hashas
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".7rem",
              marginTop: ".5em",
              color: "var(--black)",
            }}
          >
            <img
              src={check}
              alt=""
              style={{ height: "25px", width: "auto", marginRight: "5px" }}
            />
            Track your progress
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".7rem",
              marginTop: ".6em",
              color: "var(--black)",
            }}
          >
            <img
              src={check}
              alt=""
              style={{ height: "25px", width: "auto", marginRight: "5px" }}
            />
            Connect with a Chavrusa
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".7rem",
              marginTop: ".6em",
              color: "var(--black)",
            }}
          >
            <img
              src={check}
              alt=""
              style={{ height: "25px", width: "auto", marginRight: "5px" }}
            />
            Explore Community Events
          </Typography>
          {!isAuth ? (
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  boxShadow: "none",
                  marginTop: "20px",
                  height: "3rem",
                  width: "6rem",
                  fontSize: ".8em",
                  backgroundColor: "var(--brown)",
                  borderRadius: "10px",
                  textTransform: "none",
                }}
                onClick={() => {
                  navigate("/login");
                  setUserStatus("Signup");
                }}
              >
                Sign up
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  boxShadow: "none",
                  marginTop: "20px",
                  height: "3rem",
                  width: "7.5rem",
                  fontSize: ".8em",
                  backgroundColor: "var(--orange)",
                  borderRadius: "10px",
                  textTransform: "none",
                  marginLeft: "15px",
                }}
                onClick={() => {
                  navigate("/login");
                  setUserStatus("Login");
                }}
              >
                Login
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="contained"
                sx={{
                  boxShadow: "none",
                  height: "3rem",
                  width: "5.5rem",
                  fontSize: ".8em",
                  marginTop: "20px",
                  backgroundColor: "var(--brown)",
                  borderRadius: "10px",
                  textTransform: "none",
                }}
                onClick={() => navigate("/events")}
              >
                Events
              </Button>
              <Button
                variant="contained"
                sx={{
                  boxShadow: "none",
                  height: "3rem",
                  width: "11.5rem",
                  fontSize: ".8em",
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
          )}
        </Box>
        <LiveUpdates />
        <DataBoxesDisplay />
      </Box>
    </Box>
  );
}

export default Home;
