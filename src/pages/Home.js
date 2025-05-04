import {
  Box,
  Typography,
  Button,
} from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import {  useLogin } from "../utils/context/LoginContext";
import { useUser } from "../utils/context/UserContext";
import Logo from "../components/Logo";
import Nav from "../components/Nav";
import LiveUpdates from "../components/LiveUpdates";
import check from "../assets/images/Check icon Chalukas .png";

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
        <Box sx={{ color: "var(--brown)", marginBottom: "2rem" }}>
          <Typography
            sx={{
              fontFamily: "Nexa, sans-serif",
              fontSize: "2rem",
              height: "35px",
            }}
          >
            United through learning
          </Typography>
          <Typography
            sx={{ fontFamily: "Nexa, sans-serif", fontSize: "2.1rem" }}
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
                  setLoginOpen(true);
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
                  setLoginOpen(true);
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
        <Box
          className="dataBoxesDisplay"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            marginTop: "1.5rem",
          }}
        >
          <Box
            sx={{
              backgroundColor: "var(--dark-grey)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              position: "relative",
              width: "7rem",
              height: "4.8rem",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: ".8em",
                color: "var(--brown)",
                padding: ".5em",
              }}
            >
              Members
            </Typography>
            <Box
              sx={{
                borderRadius: "13px",
                bgcolor: "white",
                width: "90%",
                height: "55%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ color: "var(--light-blue)", fontSize: ".8em" }}>
                226
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "var(--dark-grey)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              position: "relative",
              width: "7rem",
              height: "4.8rem",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: ".8em",
                color: "var(--brown)",
                padding: ".5em",
              }}
            >
              Pages
            </Typography>
            <Box
              sx={{
                borderRadius: "13px",
                bgcolor: "white",
                width: "90%",
                height: "55%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ color: "var(--light-blue)", fontSize: ".8em" }}>
                306,983
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "var(--dark-grey)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              position: "relative",
              width: "7rem",
              height: "4.8rem",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: ".8em",
                color: "var(--brown)",
                padding: ".5em",
              }}
            >
              Events
            </Typography>
            <Box
              sx={{
                borderRadius: "13px",
                bgcolor: "white",
                width: "90%",
                height: "55%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <Typography sx={{ color: "var(--light-blue)", fontSize: ".8em" }}>
                42
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
