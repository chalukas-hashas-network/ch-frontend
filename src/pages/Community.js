import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  List,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Avatar,
} from "../utils/dataExports/muiExports";
import { getCommunities } from "../utils/API/CommunityAPI";

function Community() {
  const [communities, setCommunities] = useState([]);

  useEffect(function getAllCommunities() {
    getCommunities().then((data) => setCommunities(data));
  }, []);

  return (
    <div>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      {/* dropdown for select all communities, default is users community (think of default for visitor) */}
      <div>
        <select>
          <option value="all">All Communities</option>
          {communities.map((community) => (
            <option value={community.id}>{community.name}</option>
          ))}
        </select>
      </div>
      {communities.map((community) => (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItemButton alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={community.name} src={community?.image} />
            </ListItemAvatar>
            <ListItemText primary={community.name} />
          </ListItemButton>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
}

export default Community;
