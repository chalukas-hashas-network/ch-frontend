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
  Dialog,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";
import LiveUpdates from "../components/LiveUpdates";
import { useEvent } from "../utils/context/EventContext";
import AddEventPopup from "../components/AddEventPopup";
import defaultImage from "../assets/images/default image.jpeg";

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
  const [selectedDropdown, setSelectedDropdown] = useState({
    name: "",
    firstLetter: "",
  });

  const { allEvents, setAllEvents, getAllEventData } = useEvent();

  useEffect(
    function getAllEvents() {
      getAllEventData();
      if (selectedDropdown.name !== "") {
        setEvents(
          allEvents.filter(
            (event) =>
              event.location.toLowerCase() ===
              selectedDropdown.name.toLowerCase()
          )
        );
      } else {
        setEvents(allEvents);
      }
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
              {events.map((event, index) => (
                <Card
                  elevation={0}
                  key={index}
                  sx={{
                    borderRadius: "16px",
                    width: "11rem",
                    height: "13rem",
                    position: "relative",
                  }}
                >
                  <img
                    src={event.image || defaultImage}
                    alt="Event"
                    style={{
                      height: "auto",
                      width: "100%",
                      maxHeight: "6em",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      padding: 0,
                      paddingTop: ".3em",
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
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 0,
            height: "auto",
            minHeight: "35em",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={viewEvent.event.image || defaultImage}
              alt="Event"
              style={{
                height: "auto",
                width: "100%",
                maxHeight: "10em",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: ".5em",
                width: "80%",
              }}
            >
              <Typography sx={{ color: "var(--orange)", fontSize: "1.6em" }}>
                {viewEvent.event.title}
              </Typography>
              <Typography
                sx={{
                  color: "var(--black)",
                  fontSize: "1em",
                  textAlign: "start",
                }}
              >
                {viewEvent.event.description}
              </Typography>
              <Box>
                <Typography
                  sx={{
                    color: "var(--brown)",
                    fontSize: ".8em",
                    textAlign: "start",
                  }}
                >
                  Location:
                </Typography>
                <Typography
                  sx={{ color: "var(--light-blue)", fontSize: "1em" }}
                >
                  {viewEvent.event.address}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "var(--brown)",
                    fontSize: ".8em",
                    textAlign: "start",
                  }}
                >
                  {" "}
                  Date & Time
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1em",
                    color: "var(--light-blue)",
                  }}
                >
                  {viewEvent.event.date} {viewEvent.event.time}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: "5px",
                  width: "100%",
                  backgroundColor: "var(--light-grey)",
                  borderRadius: "20px",
                }}
              >
                <Typography sx={{ color: "var(--brown)", fontSize: "1em" }}>
                  Hosted by {viewEvent.event.host}
                </Typography>
              </Box>
            </Box>
            {viewEvent.event.rsvp && (
              <Button
                onClick={() => {
                  console.log("RSVP clicked");
                }}
                href={viewEvent.event.rsvp} // URL needs to contain http or https
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
                  marginBottom: "1em",
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
