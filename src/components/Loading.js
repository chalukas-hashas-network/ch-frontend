import { Box, CircularProgress } from "../utils/dataExports/muiExports";
export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: " 100vh",
      }}
    >
      <CircularProgress size="3rem" style={{ color: "var(--orange)" }} />
    </Box>
  );
}