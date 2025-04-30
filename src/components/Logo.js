import { Typography } from "../utils/dataExports/muiExports";
import logo from "../assets/images/Chalukas Hashas Logo ts.png";


function Logo({ community }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={logo} style={{ height: "100px", width: "auto" }} alt="Logo" />
      <Typography variant="overline" sx={{ color: "var(--orange)" }}>
        {community.toUpperCase()} COMMUNITY
      </Typography>
    </div>
  );
}

export default Logo;
