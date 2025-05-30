import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  SearchRoundedIcon,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  CloseRoundedIcon,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";
import LiveUpdates from "../components/LiveUpdates";
import ChavrusaPopup from "../components/ChavrusaPopup";
import { findUserById } from "../utils/API/UserAPI";

export default function Chavrusa() {
  // next to search bar have button for "my chavrusas"
  // make chavrusa popup with list of chavrusas and requests
  // when you click on a chavrusa, a popup with chavrusas info and a request button

  const [selectedChavrusa, setSelectedChavrusa] = useState(null);
  const [chavrusas, setChavrusas] = useState([]);
  const [popupCard, setPopupCard] = useState({
    isOpen: false,
    status: "",
  });
  const [selectedDropdown, setSelectedDropdown] = useState({
    name: "",
    firstLetter: "",
  });

  const getChavrusaInfo = async (chavrusa_id) => {
    try {
      const userData = await findUserById(chavrusa_id, ["goal"]);
      // TODO: get users tractates
      setSelectedChavrusa(userData);
    } catch (error) {
      console.error("Error fetching chavrusa info:", error);
      setSelectedChavrusa(null);
    }
  };

  const dropdownOptions = states?.map((state) => {
    const firstLetter = state[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      name: state,
    };
  });

  const reset = () => {
    setPopupCard({ isOpen: false, status: "" });
    setSelectedDropdown({ name: "", firstLetter: "" });
    setSelectedChavrusa(null);
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
        className="header"
        sx={{
          width: "90%",
          maxWidth: "23em",
          display: "flex",
          gap: "1em",
          justifyContent: "center",
          marginBottom: "1em",
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
              placeholder="Search by State"
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
        <Button
          variant="contained"
          onClick={() =>
            setPopupCard({ isOpen: true, status: "viewMyChavrusas" })
          }
          sx={{
            borderRadius: "15px",
            boxShadow: "none",
            backgroundColor: "var(--orange)",
            fontSize: "0.8em",
            height: "2.5rem",
            width: "11rem",
            textTransform: "none",
          }}
        >
          View My Chavrusas
        </Button>
      </Box>
      <Box className="chavrusaCards" sx={{ marginBottom: "1em" }}>
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
          {chavrusas.length > 0 ? (
            <>
              {chavrusas.map((chavrusa) => (
                <Card
                  elevation={0}
                  key={chavrusa.id}
                  sx={{
                    borderRadius: "16px",
                    width: "11rem",
                    height: "11.5rem",
                    position: "relative",
                  }}
                >
                  <CardContent
                    sx={{
                      position: "relative",
                      // top: "3em",
                      marginTop: "2em",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setSelectedChavrusa(chavrusa);
                        setPopupCard({
                          isOpen: true,
                          status: "viewChavrusaInfo",
                        });
                      }}
                      sx={{}}
                    >
                      Connect
                    </Button>
                    <Typography sx={{ color: "black", fontSize: ".9em" }}>
                      {chavrusa.title}
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
                          // width: `${parseFloat(
                          //   community.community_goal?.length > 0
                          //     ? (community.community_goal[0]
                          //         .community_total_completed_pages /
                          //         community.community_goal[0]
                          //           .community_total_selected_pages) *
                          //         100
                          //     : 0
                          // )}%`,
                          bgcolor: "var(--light-blue)",
                          borderRadius: "20px",
                          marginLeft: "5px",
                        }}
                      />
                      <Box
                        className="progressNumber"
                        sx={{
                          // left: `${parseFloat(
                          //   community.community_goal?.length > 0
                          //     ? (community.community_goal[0]
                          //         .community_total_completed_pages /
                          //         community.community_goal[0]
                          //           .community_total_selected_pages) *
                          //         100
                          //     : 0
                          // )}%`,
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
                          {/* {`${
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
                        }%`} */}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      // onClick={() =>
                      //   navigate("/community/user.community_id")
                      // }
                      sx={{
                        boxShadow: "none",
                        color: "var(--light-blue)",
                        textDecoration: "underline",
                        fontSize: ".7em",
                        padding: "1em",
                        textTransform: "none",
                      }}
                    >
                      View Community
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <Card
              elevation={0}
              key="chavrusaId"
              sx={{
                borderRadius: "16px",
                width: "11rem",
                height: "11.5rem",
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
                <Typography>No chavrusas</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Box>
      {popupCard && (
        <Dialog
          open={popupCard.isOpen}
          onClose={() => reset()}
          PaperComponent={Card}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "15px",
              },
            },
          }}
          sx={{ backdropFilter: "blur(5px)" }}
        >
          <div
            className="popup-card"
            style={
              {
                // height: "47em",
                display: "flex",
                justifyContent: "center",
              }
            }
          >
            <Button
              onClick={() => setPopupCard({ isOpen: false, status: "" })}
              //   onClick={() => reset()}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseRoundedIcon style={{ color: "var(--orange)" }} />
            </Button>
          <ChavrusaPopup
            setPopupCard={setPopupCard}
            popupCard={popupCard}
            reset={reset}
            selectedChavrusa={selectedChavrusa}
            getChavrusaInfo={getChavrusaInfo}
          />
          </div>
        </Dialog>
      )}
      <LiveUpdates />
    </Box>
  );
}
