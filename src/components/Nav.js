import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Tab,
  Tabs,
  tabsClasses,
} from "../utils/dataExports/muiExports";
import { useUser } from "../utils/context/UserContext";

function Nav() {
  const { logout, isAuth, isAdmin, triggerLoading, isSuperAdmin, user } =
    useUser();
  // const { setUserStatus } = useLogin();

  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = [
    { label: "Home", path: "/home" },
    { label: "Communities", path: "/community" },
    { label: "Events", path: "/events" },
  ];

  if (isAuth) {
    tabRoutes.push({ label: "Chavrusas", path: "/chavrusas" });
    tabRoutes.push({ label: "My Progress", path: "/goal" });
  }

  if (isSuperAdmin) {
    tabRoutes.push({ label: "Admin Dashboard", path: "/dashboard" });
  }
  if (isAdmin && !isSuperAdmin) {
    tabRoutes.push({
      label: "Admin Dashboard",
      path: `/dashboard/${user?.community?.id}`,
    });
  }

  // Get selected tab index based on current route
  const currentTabIndex = tabRoutes.findIndex((tab) =>
    location.pathname.startsWith(tab.path)
  );

  // Handle tab change and set loading
  const handleChange = (event, newIndex) => {
    let timeoutId = "";

    if (
      tabRoutes[newIndex].path !== "/goal" &&
      tabRoutes[newIndex].path !== "/home"
    ) {
      timeoutId = triggerLoading(400);
    }

    navigate(tabRoutes[newIndex].path);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "2em",
        position: "relative",
      }}
    >
      <Tabs
        value={currentTabIndex === -1 ? 0 : currentTabIndex}
        onChange={handleChange}
        variant="scrollable"
        sx={{
          zIndex: "1000",
          maxWidth: { xs: "99%" },
          height: "5.5em",
          backgroundColor: "var(--background-color)",
          [`& .${tabsClasses.scrollButtons}`]: {
            color: "var(--black)",
          },
        }}
        slotProps={{
          indicator: {
            sx: {
              backgroundColor: "var(--orange)",
            },
          },
        }}
      >
        {tabRoutes.map((tab) => (
          <Tab
            key={tab.path}
            label={tab.label}
            sx={{
              textTransform: "none",
              bgcolor: "white",
              width: ".5em",
              fontSize: ".6em",
              borderRadius: "10px",
              margin: ".8em",
              "&.Mui-selected": {
                color: "white",
                bgcolor: "var(--orange)",
              },
            }}
          />
        ))}
      </Tabs>
      <hr
        style={{
          width: "90%",
          border: "none",
          height: "2px",
          backgroundColor: "white",
          margin: 0,
          position: "absolute",
          bottom: 0,
          zIndex: "999",
        }}
      />
    </Container>
  );
}

export default Nav;
