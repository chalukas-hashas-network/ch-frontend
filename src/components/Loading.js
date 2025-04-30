import { Box, CircularProgress } from "../utils/dataExports/muiExports";
import { useUser } from "../utils/Context";

export default function Loading() {
  const { isLoading } = useUser();

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: " 100vh",
            top: 0,
            left: 0,
            zIndex: 9999,
            width: "100vw",
            backgroundColor: "white",
          }}
        >
          <CircularProgress size="3rem" style={{ color: "var(--orange)" }} />
        </Box>
      )}
    </>
  );
}
