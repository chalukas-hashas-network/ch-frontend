import {
  Typography,
  Paper,
  Slider,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ArrowBackIcon,
} from "../utils/dataExports/muiExports";
import { useEffect, useState, Fragment } from "react";
import { getCommunities } from "../utils/API/CommunityAPI";
import JoinCommunityPopup from "../components/JoinCommunityPopup";
import { useParams, useNavigate } from "react-router-dom";
import DataBoxesDisplay from "../components/DataBoxesDisplay";

function CommunityMembers() {
  const [joinPopup, setJoinPopup] = useState({
    isOpen: false,
    community: null,
  });
  const [communityData, setCommunityData] = useState({
    community_goal: {
      community_total_completed_pages: 0,
      community_total_selected_pages: 1,
    },
    members: [],
    name: "",
    id: null,
  });
  const { community_goal, members, name } = communityData;
  const { community_id } = useParams();
  const navigate = useNavigate();

  useEffect(function getCommunityData() {
    getCommunities({ id: community_id }, ["members", "community_goal"]).then(
      (data) => {
        const { members, community_goal, location, name } = data[0];

        const goal = community_goal?.[0] || {
          community_total_completed_pages: 0,
          community_total_selected_pages: 1,
        };

        setCommunityData({
          community_goal: {
            community_total_completed_pages:
              goal.community_total_completed_pages,
            community_total_selected_pages: goal.community_total_selected_pages,
          },
          members: members,
          name: name,
          id: Number(community_id),
        });
      }
    );
  }, []);

  const { community_total_completed_pages, community_total_selected_pages } =
    community_goal;

  const percentageCompleted =
    (community_total_completed_pages / community_total_selected_pages) * 100 ||
    0;

  function capitalizeWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <Box
      sx={{
        paddingTop: "1em",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        sx={{
          color: "var(--black)",
          position: "absolute",
          left: { xs: "2em", md: "15em" },
        }}
        onClick={() => {
          navigate("/community");
        }}
      >
        <ArrowBackIcon />
      </Button>
      <Box
        style={{
          width: "90%",
          marginTop: "2em",
          maxWidth: "400px",
          color: "var(--black)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "95%",
            maxWidth: 450,
            marginTop: "10px",
            bgcolor: "white",
            borderRadius: "16px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ paddingTop: "1em", color: "var(--brown)" }}
          >
            {capitalizeWord(name)} Community
          </Typography>
          <Button
            sx={{
              color: "var(--light-blue)",
              textDecoration: "underline",
              textTransform: "none",
              fontSize: ".7em",
              paddingTop: "0px",
            }}
          >
            {members.length > 0
              ? `${members.length} Community Members`
              : "No Members Yet"}{" "}
          </Button>
          <Slider
            disabled
            value={percentageCompleted}
            aria-label="Disabled slider"
            sx={{
              width: "75%",
              "& .MuiSlider-thumb": {
                color: "var(--light-blue)",
                height: ".9em",
                width: ".9em",
              },
              "& .MuiSlider-track": {
                color: "var(--light-blue)",
                height: ".4em",
              },
              "& .MuiSlider-rail": {
                color: "var(--dark-grey)",
                height: ".5em",
              },
            }}
          />
          <Typography
            sx={{
              color: "var(--light-blue)",
              fontSize: ".9em",
              marginBottom: "1em",
            }}
          >
            {percentageCompleted ? `${percentageCompleted.toFixed(2)}%` : "0%"}
          </Typography>
        </Paper>
        <Box
          sx={{
            marginTop: "1em",
            marginBottom: "1em",
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--orange)",
              boxShadow: "none",
              textTransform: "none",
              borderRadius: "15px",
              height: "2.5rem",
              width: "7rem",
              fontSize: ".85em",
            }}
            onClick={() =>
              setJoinPopup({ isOpen: true, community: communityData })
            }
          >
            Join
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--brown)",
              boxShadow: "none",
              textTransform: "none",
              borderRadius: "15px",
              height: "2.5rem",
              width: "14rem",
              fontSize: ".85em",
            }}
            onClick={() =>
              // TODO: set up logic
              alert("This feature isn't set up yet")
            }
          >
            View Community Chart
          </Button>
        </Box>
        <Box
          className="members"
          sx={{
            backgroundColor: "var(--dark-grey)",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            maxWidth: 450,
            maxHeight: 400,
            minHeight: 100,
            paddingTop: "15px",
            paddingBottom: "15px",
            position: "relative",
          }}
        >
          <List
            sx={{
              width: "95%",
              overflowY: "auto",
              gap: 1,
              bgcolor: "white",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                color: "var(--light-blue)",
                textDecoration: "underline",
                textTransform: "none",
                fontSize: ".7em",
                paddingTop: "0px",
              }}
            >
              {members.length > 0
                ? `${members.length} Community Members`
                : "No Members Yet"}{" "}
            </Button>
            {members?.length > 0 ? (
              members?.map((member, index) => (
                <ListItem
                  alignItems="flex-start"
                  key={index}
                  sx={{
                    backgroundColor: "var(--light-grey)",
                    borderRadius: "20px",
                    maxWidth: "95%",
                    height: "3.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <ListItemText
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: ".9rem",
                        },
                      },
                    }}
                    primary={`${capitalizeWord(
                      member.first_name
                    )} ${capitalizeWord(member.last_name)}`}
                    secondary={
                      <Fragment>
                        <Typography sx={{fontSize: ".45rem", color: "var(--light-blue)"}}>
                          {/* //TODO: set up logic for time {postedTime} */}
                          26 Minutes ago
                        </Typography>
                        <Typography sx={{fontSize: ".55rem", color: "var(--black)"}}>
                          With {capitalizeWord(name)}
                        </Typography>
                      </Fragment>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem
                alignItems="flex-start"
                sx={{
                  backgroundColor: "var(--light-grey)",
                  borderRadius: "20px",
                  maxWidth: "95%",
                  height: "3.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <ListItemText
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "1rem",
                      },
                    },
                  }}
                  primary="No members to display yet"
                />
              </ListItem>
            )}
          </List>
        </Box>
        <Box
          sx={{
            marginTop: "1em",
            marginBottom: "1em",
            width: "95%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
          onClick={() => navigate("/events")}
            variant="contained"
            sx={{
              backgroundColor: "var(--orange)",
              boxShadow: "none",
              textTransform: "none",
              borderRadius: "15px",
              height: "2.5rem",
              width: "7rem",
              fontSize: ".8em",
            }}
          >
            View events
          </Button>
          <Button
          onClick={() => 
            // TODO: set up logic
            // ? only for users logged in? trigger login?
            navigate("/chavrusas")
          }
            variant="contained"
            sx={{
              backgroundColor: "var(--brown)",
              boxShadow: "none",
              textTransform: "none",
              borderRadius: "15px",
              height: "2.5rem",
              width: "14rem",
              fontSize: ".8em",
            }}
          >
            Scout Chavrusas
          </Button>
        </Box>
        <DataBoxesDisplay pages={community_total_completed_pages} members={members.length}/>
        {joinPopup.isOpen && (
          <JoinCommunityPopup
            setJoinPopup={setJoinPopup}
            joinPopup={joinPopup}
          />
        )}
      </Box>
    </Box>
  );
}

export default CommunityMembers;
