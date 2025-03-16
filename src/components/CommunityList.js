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
import { getCommunities } from "../utils/API/CommunityAPI";

function CommunityList({ setListSelected, setSelectedCommunity }) {
  const [toggleDropdown, setToggleDropdown] = useState("name");
  const [communities, setCommunities] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState({
    name: "",
    firstLetter: "",
  });

  useEffect(function getAllCommunities() {
    getCommunities().then((data) => {
      setCommunities(data);
      setCommunityData(data);
    });
  }, []);

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

  const handleDropdownChange = (e, newAlignment) => {
    setToggleDropdown(newAlignment);
  };

  return (
    <div>
      <h1>Community List</h1>
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
            onChange={handleDropdownChange}
            aria-label="Platform"
          >
            <ToggleButton value="name">Name</ToggleButton>
            <ToggleButton value="state">State</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <br />
        <div>
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
