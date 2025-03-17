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

function Home() {

  const navigate = useNavigate();

  // get communities and display first 3
  const cards = [
    {
      id: 1,
      title: "Plants",
      description: "Plants are essential for all life.",
    },
    {
      id: 2,
      title: "Animals",
      description: "Animals are a part of nature.",
    },
    {
      id: 3,
      title: "Humans",
      description: "Humans depend on plants and animals for survival.",
    },
  ];

  return (
    <Box>
      <Box sx={{ margin: "150px" }}>
        <Typography variant="h4">
          United through learning Chalukas Hashas
        </Typography>
        <Typography style={{ display: "flex", alignItems: "center" }}>
          <TaskAltRoundedIcon /> Track your progress
        </Typography>
        <Typography style={{ display: "flex", alignItems: "center" }}>
          <TaskAltRoundedIcon /> Connect with a Chavrusa
        </Typography>
        <Typography style={{ display: "flex", alignItems: "center" }}>
          <TaskAltRoundedIcon /> Explore community events
        </Typography>
        {/* //! figure out how to trigger signup from here  */}
        <Button variant="contained" color="primary" sx={{ marginTop: "20px", marginRight: "20px" }}>
          Sign up
        </Button>
        
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }}>
          <PersonAddAltRoundedIcon /> Find a Chavrusa
        </Button>
      </Box>
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
            sx={{ flex: "1 1 200px", minWidth: "150px", maxWidth: "300px", height: "150px" }}
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
        <Card sx={{ flex: "1 1 200px", minWidth: "150px", maxWidth: "300px", height: "150px" }}>
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
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                View more <EastRoundedIcon />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
}

export default Home;
