import { useState } from "react";
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
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";
import LiveUpdates from "../components/LiveUpdates";

import { CardHeader, CardMedia } from "@mui/material";
import AddEventPopup from "../components/AddEventPopup";

// ? if events are a separate fetch from communities, set up event context
/* 
main page card display: 
Title, image (optional), host, view more button

on view- popup of card

*/

function Events() {
  const [selectedDropDown, setSelectedDropdown] = useState({
    name: "",
    firstLetter: "",
  });
  const [events, setEvents] = useState([]);
  const [addEventPopup, setAddEventPopup] = useState(false);

  const dropdownOptions = states?.map((state) => {
    const firstLetter = state[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      name: state,
    };
  });

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
                  {/* <CardHeader> */}
                  <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                  />
                  {/* </CardHeader> */}
                  <CardContent
                    sx={{
                      position: "relative",
                      top: "2em",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  ></CardContent>
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
      {addEventPopup && (
        <AddEventPopup setAddEventPopup={setAddEventPopup}/>
      )}
    </Box>
  );
}

export default Events;
