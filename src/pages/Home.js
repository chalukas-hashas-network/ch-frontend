import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  EastRoundedIcon,
  Grid,
  PersonAddAltRoundedIcon,
  TaskAltRoundedIcon,
  Slider,
} from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/Context";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useUser();

  // get communities and display first 3
  const cards = [{id: 1}, {id: 2}, {id:3}];
  
  return (
    <Box style={{ color: "black" }}>
      <Box className="pageDisplay"
        sx={{
          height: "550px",
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
                border: "2px solid lightgrey",
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
                          // defaultValue={
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
                            '& .MuiSlider-thumb': {
                              color: '#139ad4',
                              height: '12px',
                              width: '12px',
                            },
                            '& .MuiSlider-track': {
                              color: '#139ad4',
                            },
                            '& .MuiSlider-rail': {
                              color: 'grey'
                            }
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
