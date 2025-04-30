import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  TaskAltRoundedIcon,
  Slider,
} from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import { useUser, useLogin } from "../utils/Context";
import Logo from "../components/Logo";
import Nav from "../components/Nav";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useUser();
  const { setLoginOpen, setUserStatus } = useLogin();

  // get communities and display first 3
  const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <Box style={{ marginTop: "3em" }}>
      <Logo community="Global" />
      <Nav />
      <Box
        className="pageDisplay"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          paddingTop: { xs: "2em", md: "50px" },
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: "var(--black)" }}>
            United through learning
          </Typography>
          <Typography variant="h4" sx={{ color: "var(--black)" }}>
            Chalukas Hashas
          </Typography>
          <Typography
            variant="overline"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.5em",
              marginTop: "1em",
            }}
          >
            <TaskAltRoundedIcon
              sx={{ marginRight: "7px", color: "var(--orange)" }}
            />{" "}
            Track your progress
          </Typography>
          <Typography
            variant="overline"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.5em",
            }}
          >
            <TaskAltRoundedIcon
              sx={{ marginRight: "7px", color: "var(--orange)" }}
            />{" "}
            Connect with a Chavrusa
          </Typography>
          <Typography
            variant="overline"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.5em",
            }}
          >
            <TaskAltRoundedIcon
              sx={{ marginRight: "7px", color: "var(--orange)" }}
            />{" "}
            Explore community events
          </Typography>
          {!isAuth && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                boxShadow: "none",
                marginTop: "20px",
                backgroundColor: "var(--black)",
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
          )}
          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              marginTop: "20px",
              backgroundColor: "var(--orange)",
              marginLeft: "25px",
              borderRadius: "10px",
              textTransform: "none",
            }}
            onClick={() => navigate("/community")}
          >
            View Communities
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
      <Box className="communityCardPreview">
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              variant="outlined"
              sx={{
                border: "2px solid var(--light-grey)",
                borderRadius: "16px",
                flex: "1 1 200px",
                minWidth: "100px",
                maxWidth: "300px",
                height: "150px",
                marginRight: "1em",
                marginLeft: "1em",
                marginTop: "1em",
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
                      className="progressBarContainer"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    >
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <Slider
                          disabled
                          defaultValue={30}
                          // value={
                          //   community.community_goal?.length > 0
                          //     ? (community.community_goal[0]
                          //         .community_total_completed_pages /
                          //         community.community_goal[0]
                          //           .community_total_selected_pages) *
                          //       100
                          //     : 0
                          // }
                          aria-label="Disabled slider"
                          sx={{
                            "& .MuiSlider-thumb": {
                              color: "var(--light-blue)",
                              height: "12px",
                              width: "12px",
                            },
                            "& .MuiSlider-track": {
                              color: "var(--light-blue)",
                            },
                            "& .MuiSlider-rail": {
                              color: "var(--light-grey)",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {"30%"}
                          {/* {` ${community.community_goal?.length > 0
                                    ? (
                                        parseFloat(
                                          community.community_goal[0]
                                            .community_total_completed_pages /
                                            community.community_goal[0]
                                              .community_total_selected_pages
                                        ) * 100
                                      ).toFixed(2)
                                    : 0}%`} */}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
          {/* <Card
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
          </Card> */}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
