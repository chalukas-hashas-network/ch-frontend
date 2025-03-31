import {
  TextField,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Slider,
} from "../utils/dataExports/muiExports";
import { useState, useEffect } from "react";
import states from "../utils/dataExports/StatesExports";

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
    <div
      style={{
        color: "black",
        alignItems: "center",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        className="stateFilterContainer"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <div className="filterOptionToggle" style={{ marginRight: "1em" }}>
          <ToggleButtonGroup
            value={toggleDropdown}
            exclusive
            onChange={(e) => handleDropdownChange(e)}
            aria-label="Platform"
          >
            <ToggleButton
              value="name"
              sx={{
                color: toggleDropdown === "name" ? "var(--orange)" : "gray",
                "&.Mui-selected": {
                  color: "var(--orange)",
                  backgroundColor: "rgba(185, 108, 26, 0.08)",
                },
              }}
            >
              Name
            </ToggleButton>
            <ToggleButton
              value="state"
              sx={{
                color: toggleDropdown === "state" ? "var(--orange)" : "gray",
                "&.Mui-selected": {
                  color: "var(--orange)",
                  backgroundColor: "rgba(185, 108, 26, 0.08)",
                },
              }}
            >
              State
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <br />
        <div className="searchBarDropdown" style={{ color: "black" }}>
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
            sx={{
              width: 300,
              "& .MuiOutlinedInput-root": {
                color: "black",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "var(--orange-light)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--orange)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "black",
                "&.Mui-focused": {
                  color: "black",
                },
              },
              "& .MuiSelect-select": {
                color: "var(--orange)",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Select ${
                  toggleDropdown === "name" ? "Community" : "State"
                }`}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "var(--orange)",
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--orange)",
                    },
                  },
                }}
              />
            )}
          />
        </div>
      </Box>
      {communityData.length > 0 ? (
        <Box>
          <Grid
            container
            direction="row"
            size={8}
            sx={{
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "1em",
              marginTop: "1em",
            }}
          >
            {communityData.map((community, index) => (
              <Grid
                key={community.id}
                onClick={() => {
                  setListSelected("members");
                  setSelectedCommunity(community);
                }}
              >
                <Card
                  key={community.id}
                  sx={{
                    flex: "1 1 300px",
                    minWidth: "320px",
                    maxWidth: "400px",
                    height: "150px",
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
                      <img src={community.image} alt="Community" />
                      <div>
                        <Typography variant="body2" component="div">
                          {community.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Community in {community.location}
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
                            <Slider
                              disabled
                              defaultValue={
                                community.community_goal?.length > 0
                                  ? (community.community_goal[0]
                                      .community_total_completed_pages /
                                      community.community_goal[0]
                                        .community_total_selected_pages) *
                                    100
                                  : 0
                              }
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
                              {`${
                                community.community_goal?.length > 0
                                  ? (
                                      parseFloat(
                                        community.community_goal[0]
                                          .community_total_completed_pages /
                                          community.community_goal[0]
                                            .community_total_selected_pages
                                      ) * 100
                                    ).toFixed(2)
                                  : 0
                              }%`}
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <p>No communities found</p>
      )}
    </div>
  );
}

export default CommunityList;
