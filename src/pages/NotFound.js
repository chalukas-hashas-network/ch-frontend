import { Button, Typography } from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <Typography sx={{ fontSize: "4em", color: "var(--brown)" }}>
        404
      </Typography>
      <Typography sx={{ fontSize: "2em", marginTop: ".7em" }}>
        Uh Oh! You are lost.
      </Typography>
      <Typography
        sx={{ fontSize: "1.2em", color: "var(--brown)", marginTop: ".5em" }}
      >
        The page you are looking for does not exist, try looking in a different
        Mesechta.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/home");
        }}
        sx={{
          borderRadius: "13px",
          boxShadow: "none",
          backgroundColor: "var(--orange)",
          fontWeight: "300",
          fontSize: "0.8em",
          width: "10em",
          height: "3em",
          marginTop: "3em",
          textTransform: "none",
        }}
      >
        Take me Home
      </Button>
    </div>
  );
}

export default NotFound;
