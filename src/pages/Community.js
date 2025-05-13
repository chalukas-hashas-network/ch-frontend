import {
  TextField,
  Autocomplete,
  MenuItem,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  SearchRoundedIcon,
} from "../utils/dataExports/muiExports";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import states from "../utils/dataExports/StatesExports";
import JoinCommunityPopup from "../components/JoinCommunityPopup";
import { useCommunity } from "../utils/context/CommunityContext";
import { useUser } from "../utils/context/UserContext";

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
  const [communityData, setCommunityData] = useState([]);

  const { allCommunities } = useCommunity();

  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(
    function getAllCommunities() {
      setCommunityData(allCommunities);
    },
    [allCommunities]
  );

  const dropdownOptions =
    toggleDropdown === "name"
      ? allCommunities?.map((community) => {
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
            allCommunities.filter(
              (community) =>
                community.name.toLowerCase() ===
                selectedDropdown.name.toLowerCase()
            )
          );
        } else {
          setCommunityData(
            allCommunities.filter(
              (community) =>
                community.location.toLowerCase() ===
                selectedDropdown.name.toLowerCase()
            )
          );
        }
      } else {
        setCommunityData(allCommunities);
      }
    },
    [selectedDropdown, toggleDropdown]
  );

  const handleDropdownChange = (e) => {
    setToggleDropdown(e.target.value);
  };

  return (
    <Box
      sx={{
        paddingTop: "2em",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        className="stateFilterContainer"
        sx={{
          width: "90%",
          maxWidth: "23em",
          display: "flex",
          gap: "1em",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          className="searchBarDropdown"
          freeSolo
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
            width: "12rem",
            borderRadius: "15px",
            backgroundColor: "white",
            height: "2.5rem",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              height: "2.5rem",
              borderRadius: "15px",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
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
                          color: "var(--black)",
                          marginRight: "0px",
                          fontSize: "1.3rem",
                        }}
                      />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  // width: "11rem",
                  backgroundColor: "white",
                  height: "2.5rem",
                  borderRadius: "15px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                  fontSize: "0.8rem",
                },
                "& input::placeholder": {
                  color: "var(--black)",
                  opacity: 1,
                },
              }}
            />
          )}
        />
        <TextField
          className="filterOptionToggle"
          select
          value={toggleDropdown}
          onChange={(e) => handleDropdownChange(e)}
          sx={{
            width: "12rem",
            borderRadius: "15px",
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              height: "2.5rem",
              borderRadius: "15px",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
            "& .MuiSelect-select": {
              fontSize: "0.8rem",
            },
          }}
          slotProps={{
            select: {
              displayEmpty: true,
              renderValue: () => `Filter by ${toggleDropdown}`,
            },
          }}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="state">State</MenuItem>
        </TextField>
      </Box>
      <Box className="communityCards" sx={{ maxWidth: "23em" }}>
        {communityData.length > 0 ? (
          <Grid
            container
            direction="row"
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
                  borderRadius: "16px",
                  width: "11rem",
                  height: "13rem",
                  position: "relative",
                }}
              >
                <Button
                  variant="contained"
                  disabled={user?.community?.id === community.id}
                  sx={{
                    boxShadow: "none",
                    textTransform: "none",
                    backgroundColor: "var(--orange)",
                    borderRadius: "16px",
                    position: "absolute",
                    top: "10px",
                    right: "1em",
                    height: "1.7rem",
                    fontSize: ".8em",
                  }}
                  onClick={() => {
                    if (!user.id) {
                      navigate("/login");
                      return;
                    }
                    setJoinPopup({ isOpen: true, community: community });
                  }}
                >
                  Join
                </Button>
                <CardContent
                  sx={{
                    position: "relative",
                    top: "2em",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontSize: ".9em" }}>
                    {capitalizeWord(community.name)} Community
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: ".7em",
                      color: "var(--light-blue)",
                      // TODO: set up button logic?
                      // textDecoration: "underline",
                    }}
                  >
                    {community.members.length} Members
                  </Typography>
                  <Box
                    className="progressBar"
                    sx={{
                      width: "90%",
                      bgcolor: "var(--light-grey)",
                      borderRadius: "20px",
                      marginTop: ".8em",
                      height: "25px",
                      display: "flex",
                      alignItems: "center",
                      overflow: "visible",
                    }}
                  >
                    <Box
                      className="innerBar"
                      sx={{
                        height: "15px",
                        width: `${parseFloat(
                          community.community_goal?.length > 0
                            ? (community.community_goal[0]
                                .community_total_completed_pages /
                                community.community_goal[0]
                                  .community_total_selected_pages) *
                                100
                            : 0
                        )}%`,
                        bgcolor: "var(--light-blue)",
                        borderRadius: "20px",
                        marginLeft: "5px",
                      }}
                    />
                    <Box
                      className="progressNumber"
                      sx={{
                        left: `${parseFloat(
                          community.community_goal?.length > 0
                            ? (community.community_goal[0]
                                .community_total_completed_pages /
                                community.community_goal[0]
                                  .community_total_selected_pages) *
                                100
                            : 0
                        )}%`,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        marginRight: "10px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--light-blue)",
                          fontSize: ".65em",
                          paddingLeft: "5px",
                        }}
                      >
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
                  <Button
                    onClick={() => navigate(`/community/${community.id}`)}
                    sx={{
                      boxShadow: "none",
                      color: "var(--black)",
                      textDecoration: "underline",
                      fontSize: ".7em",
                      padding: "1.7em",
                      textTransform: "none",
                    }}
                  >
                    View community
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        ) : (
          <Card
            elevation={0}
            key="eventId"
            sx={{
              borderRadius: "16px",
              width: "11rem",
              height: "13rem",
              position: "relative",
            }}
          >
            <CardContent
              sx={{
                position: "relative",
                top: "2em",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography>No Communities Found</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
      {joinPopup.isOpen && (
        <JoinCommunityPopup setJoinPopup={setJoinPopup} joinPopup={joinPopup} />
      )}
    </Box>
  );
}

export default Community;
