import {
  TextField,
  Autocomplete,
  MenuItem,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  SearchRoundedIcon,
} from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import states from "../utils/dataExports/StatesExports";
import JoinCommunityPopup from "../components/JoinCommunityPopup";
import { getCommunities } from "../utils/API/CommunityAPI";

// TODO: make Join button logic

function Community() {
  const [toggleDropdown, setToggleDropdown] = useState("name");
  const [joinPopup, setJoinPopup] = useState({
    isOpen: false,
    community: null,
  });
  const [selectedDropdown, setSelectedDropdown] = useState({
    name: "",
    firstLetter: "",
  });
  const [communities, setCommunities] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  const navigate = useNavigate();

  useEffect(function getAllCommunities() {
    getCommunities({}, ["community_goal"]).then((data) => {
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
            name: capitalizeWord(community.name),
          };
        })
      : states?.map((state) => {
          const firstLetter = state[0].toUpperCase();
          return {
            firstLetter: firstLetter,
            name: state,
          };
        });

  function capitalizeWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  useEffect(
    function fillCommunityDataOnDropdownChange() {
      if (selectedDropdown.name !== "") {
        if (toggleDropdown === "name") {
          setCommunityData(
            communities.filter(
              (community) =>
                community.name.toLowerCase() ===
                selectedDropdown.name.toLowerCase()
            )
          );
        } else {
          setCommunityData(
            communities.filter(
              (community) =>
                community.location.toLowerCase() ===
                selectedDropdown.name.toLowerCase()
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
        marginTop: "3em",
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
          alignItems: "center",
          marginBottom: "1em",
          gap: {
            xs: "0.7em",
            md: "1.5em",
          },
        }}
      >
        <TextField
          className="filterOptionToggle"
          select
          value={toggleDropdown}
          onChange={(e) => handleDropdownChange(e)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              "& fieldset": {
                borderRadius: "50px",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--light-grey)",
              },
              height: "50px",
            },
            minWidth: {
              xs: "46dvw",
              sm: "300px",
            },
            "& .MuiSelect-select": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              color: "gray",
              fontSize: { xs: "0.7rem", sm: "1em" },
            },
          }}
          SelectProps={{
            displayEmpty: true,
            renderValue: () => `Filter by ${toggleDropdown}`,
          }}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="state">State</MenuItem>
        </TextField>
        <Autocomplete
          className="searchBarDropdown"
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
            minWidth: {
              xs: "46dvw",
              sm: "300px",
            },
            "& .MuiOutlinedInput-root": {
              color: "black",
              height: "50px",
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
              placeholder="Search by Keyword"
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SearchRoundedIcon
                        sx={{
                          mr: 1,
                          color: "gray",
                          fontSize: { xs: "1rem", sm: "1.5em" },
                        }}
                      />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    borderRadius: "50px",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--light-grey)",
                  },
                  fontSize: { xs: "0.7rem", sm: "1em" },
                },
              }}
            />
          )}
        />
      </Box>
      <Box className="communityCards">
        {communityData.length > 0 ? (
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
            {communityData.map((community) => (
              <Card
                elevation={0}
                key={community.id}
                sx={{
                  border: "2px solid var(--light-grey)",
                  borderRadius: "16px",
                  minWidth: {
                    xs: "45dvw",
                    sm: "300px",
                  },
                  maxWidth:
                    communityData.length === 1
                      ? "200px"
                      : {
                          xs: "calc(50% - 1em)",
                          sm: "calc(50% - 1em)",
                          md: "calc(33.333% - 1em)",
                          lg: "calc(25% - 1em)",
                        },
                  height: {
                    xs: "230px",
                    sm: "200px",
                    md: "250px",
                  },
                  position: "relative",
                  margin: "0",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: "none",
                    textTransform: "none",
                    backgroundColor: "var(--orange)",
                    borderRadius: "16px",
                    position: "absolute",
                    top: "10px",
                    right: {
                      xs: "10px",
                      sm: "10px",
                      md: "20px",
                      lg: "30px",
                    },
                    height: {
                      xs: "20px",
                      sm: "25px",
                      md: "30px",
                    },
                    fontSize: {
                      xs: "11px",
                      sm: "13px",
                      md: "14px",
                    },
                    padding: {
                      xs: "2px 8px",
                      sm: "3px 10px",
                      md: "4px 12px",
                    },
                  }}
                  onClick={() => {
                    setJoinPopup({ isOpen: true, community: community });
                  }}
                >
                  Join
                </Button>
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <Typography variant="body2" component="div">
                      {capitalizeWord(community.name)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Community in {capitalizeWord(community.location)}
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
                      <Box
                        className="progressBar"
                        sx={{ width: "100%", mr: 1 }}
                      >
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
                      <Box className="progress" sx={{ minWidth: 35 }}>
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
                  <Button
                    onClick={() => navigate(`/community/${community.id}`)}
                    sx={{
                      boxShadow: "none",
                      color: "black",
                      textDecoration: "underline",
                      fontSize: { xs: "10px", sm: "15px" },
                    }}
                  >
                    View community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        ) : (
          <Typography variant="h5">No communities found</Typography>
        )}
      </Box>
      {joinPopup.isOpen && (
        <JoinCommunityPopup setJoinPopup={setJoinPopup} joinPopup={joinPopup} />
      )}
    </div>
  );
}

export default Community;
