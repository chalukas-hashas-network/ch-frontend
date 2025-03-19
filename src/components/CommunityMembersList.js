import {
  Box,
  LinearProgress,
  Typography,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
} from "../utils/dataExports/muiExports";
import { useEffect, useState } from "react";
import { getCommunities } from "../utils/API/CommunityAPI";

function CommunityMembersList({ selectedCommunity }) {
  const [communityData, setCommunityData] = useState({
    community_goal: {
      community_total_completed_pages: 0,
      community_total_selected_pages: 0,
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
      console.log("community data", data[0]);
      setCommunityData({
        community_goal: {
          community_total_completed_pages:
            data[0].community_goal[0].community_total_completed_pages,
          community_total_selected_pages:
            data[0].community_goal[0].community_total_selected_pages,
        },
        members: data[0].members,
        name: data[0].name,
      });
    });
  }, []);

  const { community_total_completed_pages, community_total_selected_pages } =
    community_goal;

  const percentageCompleted =
    (community_total_completed_pages / community_total_selected_pages) * 100;

  console.log("selectedCommunity", selectedCommunity);

  return (
    <div>
      <h1>{name} Members List</h1>
      <div>
        <div className="card" style={{ height: "150px" }}>
          <>{name} Progress Bar </>
          <Box sx={{ display: "flex", alignItems: "center", margin: "10px" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={percentageCompleted}
                style={{ margin: "10px", height: "20px" }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                {percentageCompleted ? `${percentageCompleted.toFixed(2)}%` : "0%"}
              </Typography>
            </Box>
          </Box>
          <div>
            Pages complete: {community_total_completed_pages} /{" "}
            {community_total_selected_pages}
          </div>
        </div>
        <br />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
          }}
        >
          {members?.length > 0 ? (
            members?.map((member) => (
              <List
                key={member.id}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  color: "black",
                }}
                onClick={() => {
                  console.log("member", member);
                }}
              >
                <ListItemButton alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={member.first_name + " " + member.last_name}
                      src={member?.image}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.first_name + " " + member.last_name}
                  />
                </ListItemButton>
                <Divider variant="inset" component="li" />
              </List>
            ))
          ) : (
            <p>No members for this community</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityMembersList;
