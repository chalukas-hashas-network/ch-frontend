import {
  Typography,
  Paper,
  Slider,
  Card,
} from "../utils/dataExports/muiExports";
import { useEffect, useState } from "react";
import { getCommunities } from "../utils/API/CommunityAPI";

function CommunityMembersList({ selectedCommunity }) {
  const [communityData, setCommunityData] = useState({
    community_goal: {
      community_total_completed_pages: 0,
      community_total_selected_pages: 1,
    },
    members: [],
    name: "",
  });
  const { community_goal, members, name } = communityData;

  useEffect(function getCommunityData() {
    getCommunities({ id: selectedCommunity.id }, [
      "members",
      "community_goal",
    ]).then((data) => {
      const { members, community_goal, location, name } = data[0];

      const goal = community_goal?.[0] || {
        community_total_completed_pages: 0,
        community_total_selected_pages: 1,
      };

      setCommunityData({
        community_goal: {
          community_total_completed_pages: goal.community_total_completed_pages,
          community_total_selected_pages: goal.community_total_selected_pages,
        },
        members: members,
        name: name,
      });
    });
  }, []);

  const { community_total_completed_pages, community_total_selected_pages } =
    community_goal;

  const percentageCompleted =
    (community_total_completed_pages / community_total_selected_pages) * 100 ||
    0;

  return (
    <div
      style={{
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
          width: "90%",
          marginTop: "20px",
          border: "2px solid lightgrey",
          borderRadius: "16px",
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
      <br />
      <Paper
        className="membersContainer"
        elevation={0}
        sx={{
          alignItems: "center",
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          width: "90%",
          marginTop: "20px",
          backgroundColor: "var(--light-grey)",
          height: "300px",
          borderRadius: "16px",
        }}
      >
        <Paper
          elevation={0}
          className="listOfMembers"
          sx={{
            backgroundColor: "white",
            width: "90%",
            height: "80%",
            margin: "2em",
            borderRadius: "16px",
          }}
        >
          {members?.length > 0 ? (
            members?.map((member) => (
              <Card
                elevation={0}
                sx={{
                  backgroundColor: "var(--light-grey)",
                  width: "90%",
                  margin: "1em",
                  borderRadius: "25px",
                }}
                onClick={() => console.log("member", member)}
              >
                <Typography variant="h6" sx={{ marginLeft: "1.5em" }}>
                  {member.first_name + " " + member.last_name}
                </Typography>
                <Typography variant="caption" sx={{ marginLeft: "2em" }}>
                  With {member.community}
                </Typography>
              </Card>
            ))
          ) : (
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              No members for this community
            </Typography>
          )}
        </Paper>
      </Paper>
      <div>
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
            <Typography sx={{ color: "black", fontSize: ".8em" }}>
              Pages Learned
            </Typography>
          </Paper>
        </Paper>
      </div>
    </div>
  );
}

export default CommunityMembersList;
