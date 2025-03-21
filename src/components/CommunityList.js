import {
  List,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Avatar,
  TextField,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
} from "../utils/dataExports/muiExports";
import { useState, useEffect } from "react";
import states from "../utils/dataExports/StatesExports";
// import { getCommunities } from "../utils/API/CommunityAPI";

function CommunityList({
  setListSelected,
  setSelectedCommunity,
  communities,
  communityData,
  setCommunityData,
}) {
  const [toggleDropdown, setToggleDropdown] = useState("name");
  const [selectedDropdown, setSelectedDropdown] = useState({
    name: "",
    firstLetter: "",
  });

  const dropdownOptions =
    toggleDropdown === "name"
      ? communities?.map((community) => {
          const firstLetter = community.name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            name: community.name,
          };
        })
      : states?.map((state) => {
          const firstLetter = state[0].toUpperCase();
          return {
            firstLetter: firstLetter,
            name: state,
          };
        });

  useEffect(
    function fillCommunityDataOnDropdownChange() {
      if (selectedDropdown.name !== "") {
        if (toggleDropdown === "name") {
          setCommunityData(
            communities.filter(
              (community) => community.name === selectedDropdown.name
            )
          );
        } else {
          setCommunityData(
            communities.filter(
              (community) => community.location === selectedDropdown.name
            )
          );
        }
      } else {
        setCommunityData(communities);
      }
    },
    [selectedDropdown, toggleDropdown]
  );

  const handleDropdownChange = (e) => {
    setToggleDropdown(e.target.value);
  };

  return (
    <div style={{ color: "black" }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <ToggleButtonGroup
            color="primary"
            value={toggleDropdown}
            exclusive
            onChange={(e) => handleDropdownChange(e)}
            aria-label="Platform"
          >
            <ToggleButton value="name" sx={{ color: "white" }}>
              Name
            </ToggleButton>
            <ToggleButton value="state" sx={{ color: "white" }}>
              State
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <br />
        <div style={{ color: "white" }}>
          <Autocomplete
            options={dropdownOptions.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            onChange={(e, newValue) => {
              setSelectedDropdown({
                name: newValue ? newValue.name : "",
                firstLetter: newValue ? newValue.firstLetter : "",
              });
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Select ${
                  toggleDropdown === "name" ? "Community" : "State"
                }`}
              />
            )}
          />
        </div>
        {communityData.length > 0 ? (
          communityData.map((community) => (
            <List
              key={community.id}
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              onClick={() => {
                setListSelected("members");
                setSelectedCommunity(community);
              }}
            >
              <ListItemButton alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={community.name} src={community?.image} />
                </ListItemAvatar>
                <ListItemText primary={community.name} />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </List>
          ))
        ) : (
          <p>No communities found</p>
        )}
      </div>
    </div>
  );
}

export default CommunityList;
