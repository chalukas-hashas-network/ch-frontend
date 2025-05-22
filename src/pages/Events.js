import { useEffect, useState } from "react";
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
  CloseRoundedIcon,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";
import LiveUpdates from "../components/LiveUpdates";
import { useEvent } from "../utils/context/EventContext";

import { CardHeader, CardMedia, Dialog, Divider } from "@mui/material";
import AddEventPopup from "../components/AddEventPopup";

// ? if events are a separate fetch from communities, set up event context
/* 
main page card display: 
Title, image (optional), host, view more button

on view- popup of card

*/

function Events() {
  const [events, setEvents] = useState([]);
  const [addEventPopup, setAddEventPopup] = useState(false);
  const [viewEvent, setViewEvent] = useState({ popup: false, event: {} });
  const [selectedDropDown, setSelectedDropdown] = useState({
    name: "",
    firstLetter: "",
  });

  const { allEvents, setAllEvents, getAllEventData } = useEvent();

  useEffect(
    function getAllEvents() {
      getAllEventData();
      setEvents(allEvents);
    },
    [allEvents, getAllEventData]
  );

  const dropdownOptions = states?.map((state) => {
    const firstLetter = state[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      name: state,
    };
  });

  const reset = () => {
    setViewEvent({ popup: false, event: {} });
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
        <Button
          variant="contained"
          onClick={() => setAddEventPopup(true)}
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
          Create an Event
        </Button>
      </Box>
      <Box className="eventCards" sx={{ marginBottom: "1em" }}>
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
          {events.length > 0 ? (
            <>
              {events.map((event) => (
                <Card
                  elevation={0}
                  key={event.id}
                  sx={{
                    borderRadius: "16px",
                    width: "11rem",
                    height: "13rem",
                    position: "relative",
                  }}
                >
                  <CardHeader>
                    <CardMedia
                      component="img"
                      height="194"
                      image="../assets/images/Chalukas Hashas Logo TS no bottoms text .png"
                      alt="Paella dish"
                    />
                  </CardHeader>
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
                    <Typography sx={{ color: "black", fontSize: ".9em" }}>
                      {event.title}
                    </Typography>
                    <Typography sx={{ color: "black", fontSize: ".7em" }}>
                      {event.time}
                    </Typography>
                    <Typography sx={{ color: "black", fontSize: ".7em" }}>
                      Run by {event.host}
                    </Typography>
                    <Button
                      // variant="contained"
                      onClick={() =>
                        setViewEvent({ popup: true, event: event })
                      }
                      sx={{
                        boxShadow: "none",
                        color: "var(--light-blue)",
                        textDecoration: "underline",
                        fontSize: ".7em",
                        padding: "1em",
                        textTransform: "none",
                      }}
                    >
                      View More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </>
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
                <Typography>No events</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Box>
      <LiveUpdates />
      {addEventPopup && <AddEventPopup setAddEventPopup={setAddEventPopup} />}
      {/* // ! depending on how events are set up in the backend, either have it in a popup (but a lengthy description will be problomatic with card height) 
      // ! or have it in a nested page
      */}
      <Dialog
        open={viewEvent.popup}
        onClose={() => reset()}
        PaperComponent={Card}
        sx={{ backdropFilter: "blur(5px)" }}
      >
        <div
          className="popup-card"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => reset()}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <CloseRoundedIcon style={{ color: "var(--orange)" }} />
          </Button>
          <div
            style={{
              marginTop: "7em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "var(--orange)", fontSize: "1.5em" }}>
              {viewEvent.event.title}
            </Typography>
            <Divider flexItem />
            <Typography sx={{ color: "var(--black)", fontSize: "1.2em" }}>
              Address:
              <Typography sx={{ color: "var(--light-blue)" }}>
                {viewEvent.event.address}
              </Typography>
            </Typography>
            <Typography
              sx={{
                // backgroundColor: "var(--brown)",
                fontSize: ".9em",
                // paddingLeft: "15px",
                // paddingRight: "15px",
                // borderRadius: "25px",
                // color: "white",
              }}
            >
              {viewEvent.event.date} {viewEvent.event.time}
            </Typography>
            <Typography sx={{ color: "var(--brown)", fontSize: "1.2em" }}>
              Run by {viewEvent.event.host}
            </Typography>
            {viewEvent.event.rsvp && (
              <Button
                onClick={() => {
                  console.log("RSVP clicked");
                }}
                href={viewEvent.event.rsvp} // Full external URL (e.g., https://example.com/rsvp)
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                sx={{
                  backgroundColor: "var(--orange)",
                  borderRadius: "13px",
                  boxShadow: "none",
                  textTransform: "none",
                  height: "2rem",
                  width: "5rem",
                  fontSize: ".7em",
                }}
              >
                RSVP
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </Box>
  );
}

export default Events;
