import { Typography } from "../utils/dataExports/muiExports";
import logo from "../assets/images/Chalukas Hashas Logo TS no bottoms text .png";

function Logo({ community }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={logo} style={{ height: "120px", width: "auto" }} alt="Logo" />
      <Typography
        sx={{
          color: "var(--orange)",
          fontFamily: "Nexa, sans-serif",
          fontSize: ".9em",
          paddingTop: ".2rem",
        }}
      >
        {community.toUpperCase()} COMMUNITY
      </Typography>
    </div>
  );
}

export default Logo;
