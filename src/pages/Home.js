import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Card,
  CardContent,
  CardActionArea,
  EastRoundedIcon,
  Grid,
  PersonAddAltRoundedIcon,
  TaskAltRoundedIcon,
} from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/Context";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useUser();

  // get communities and display first 3
  const cards = [{}, {}, {}];
  return (
    <Box style={{ color: "white" }}>
      <Box
        sx={{
          height: "625px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          paddingTop: { xs: "50px", md: "0px" },
        }}
      >
        <Box>
          <Typography variant="h4">United through learning</Typography>
          <Typography variant="h4">Chalukas Hashas</Typography>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TaskAltRoundedIcon /> Track your progress
          </Typography>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TaskAltRoundedIcon /> Connect with a Chavrusa
          </Typography>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TaskAltRoundedIcon /> Explore community events
          </Typography>
          {/* //! figure out how to trigger signup from here  */}
          {!isAuth && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: "20px",
                backgroundColor: "var(--orange)",
              }}
            >
              Sign up
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              backgroundColor: "var(--orange)",
              marginLeft: "25px",
            }}
          >
            <PersonAddAltRoundedIcon /> Find a Chavrusa
          </Button>
        </Box>{" "}
        <Card
          variant="outlined"
          sx={{
            height: "15em",
            width: "20em",
            marginLeft: { xs: "0px", md: "100px" },
            marginTop: { xs: "25px", md: "0px" },
          }}
        >
          Images
        </Card>
      </Box>
      <Box sx={{}}>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              sx={{
                flex: "1 1 200px",
                minWidth: "150px",
                maxWidth: "360px",
                height: "150px",
              }}
            >
              <CardActionArea
                sx={{
                  height: "100%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selectedHover",
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={card.image} alt="Community" />
                  <div>
                    <Typography variant="body2" component="div">
                      Chalukas Hashas
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      community name Community
                    </Typography>
                    <br />
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    >
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={30}
                          style={{ margin: "10px", height: "4px" }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {`30%`}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
          <Card
            sx={{
              flex: "1 1 200px",
              minWidth: "150px",
              maxWidth: "360px",
              height: "150px",
              backgroundColor: "var(--orange)",
            }}
          >
            <CardActionArea
              onClick={() => navigate("/community")}
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  View more <EastRoundedIcon />
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
