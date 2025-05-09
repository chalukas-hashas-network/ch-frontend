import { Box, Typography } from "../utils/dataExports/muiExports";

function DataBoxesDisplay({members = 0, pages = 0, events = 0}) {
  return (
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
            {members}
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
            {pages}
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
            {events}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default DataBoxesDisplay;
