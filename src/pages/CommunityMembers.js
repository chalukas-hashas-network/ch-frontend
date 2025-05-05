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
    <div style={{ marginTop: "2em" }}>
      <Button
        sx={{
          color: "var(--black)",
          position: "absolute",
          left: "2em",
        }}
        onClick={() => {
          navigate("/community");
        }}
      >
        <ArrowBackIcon />
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            boxShadow: "none",
            textTransform: "none",
            backgroundColor: "var(--orange)",
            borderRadius: "20px",
            width: { xs: "40dvw", md: "200px" },
          }}
          onClick={() =>
            setJoinPopup({ isOpen: true, community: communityData })
          }
        >
          Join
        </Button>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            maxWidth: 450,
            marginTop: "10px",
            border: "2px solid lightgrey",
            borderRadius: "16px",
            padding: "15px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ paddingTop: "1em", color: "var(--brown)" }}
          >
            {name} Community
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--orange)" }}>
            {members.length > 0
              ? `${members.length} Community Members`
              : "No Members Yet"}{" "}
          </Typography>
          <Slider
            disabled
            value={percentageCompleted}
            aria-label="Disabled slider"
            sx={{
              width: "90%",
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "var(--light-blue)", marginBottom: "1em" }}
          >
            {percentageCompleted ? `${percentageCompleted.toFixed(2)}%` : "0%"}
          </Typography>
        </Paper>
        <Box
          className="members"
          sx={{
            marginTop: "3em",
            backgroundColor: "var(--light-grey)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "90%",
            maxWidth: 450,
            maxHeight: 400,
            padding: "15px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bgcolor: "var(--light-grey)",
              height: "100px",
              width: "200px",
              top: "-35px",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: 3 }}>
              Members
            </Typography>
          </Box>
          <List
            sx={{
              width: "100%",
              overflowY: "auto",
              maxHeight: "100%",
              gap: 1,
              bgcolor: "white",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {members?.length > 0 ? (
              members?.map((member, index) => (
                <ListItem
                  alignItems="flex-start"
                  key={index}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "55px",
                    marginBottom: "5px",
                    maxWidth: "95%",
                    height: "60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <ListItemText
                    primary={`${capitalizeWord(
                      member.first_name
                    )} ${capitalizeWord(member.last_name)}`}
                    secondary={
                      <Fragment>
                        <Typography variant="caption">
                          With {capitalizeWord(member.community)}
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
                  backgroundColor: "white",
                  borderRadius: "16px",
                  marginBottom: "5px",
                }}
              >
                <ListItemText primary="No members in this community yet" />
              </ListItem>
            )}
          </List>
        </Box>
        <Paper
          elevation={0}
          className="outerContainer"
          sx={{
            backgroundColor: "var(--light-grey)",
            width: "150px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1em",
            borderRadius: "16px",
          }}
        >
          <Paper
            elevation={0}
            className="innerContainer"
            sx={{
              backgroundColor: "white",
              width: "90%",
              height: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "16px",
            }}
          >
            <Typography sx={{ color: "var(--light-blue)", fontSize: "1em" }}>
              {community_total_completed_pages}
            </Typography>
            <Typography sx={{ color: "var(--black)", fontSize: ".8em" }}>
              Pages Learned
            </Typography>
          </Paper>
        </Paper>
        {joinPopup.isOpen && (
          <JoinCommunityPopup
            setJoinPopup={setJoinPopup}
            joinPopup={joinPopup}
          />
        )}
      </div>
    </div>
  );
}

export default CommunityMembers;
