import React from "react";
import {
  Dialog,
  Button,
  CloseRoundedIcon,
  Card,
  Typography,
  TextField,
  ListItem,
  ListItemText,
  List,
  Box,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";

export default function ViewCommunityChart({ popup, setPopup }) {
  // TODO: based off how backend is set up to get members and tractates, may need to fetch data here in a useEffect. if so then send communityId as a prop

  const word = ["word1", "word2", "word3", "word4"];
  console.log("popup", popup);

  return (
    <Dialog
      open={popup.isOpen}
      onClose={() => setPopup({ community: null, isOpen: false })}
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
      <div className="popup-card" style={{ height: "30em" }}>
        <Button
          onClick={() => setPopup({ community: null, isOpen: false })}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseRoundedIcon style={{ color: "var(--orange)" }} />
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1.5em",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Nexa, sans-serif",
                  color: "var(--brown)",
                  fontSize: "1em",
                }}
              >
                Community Chart
              </Typography>
              <Typography>Sort placeholder</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                marginTop: ".5em",
              }}
            >
              <Typography
                sx={{
                  color: "var(--brown)",
                  fontSize: ".8em",
                }}
              >
                Mesechtas
              </Typography>
              <Typography
                sx={{
                  color: "var(--brown)",
                  fontSize: ".8em",
                  paddingRight: { xs: "1em", md: "2em" },
                }}
              >
                Name
              </Typography>
            </Box>
          </Box>
          <Box
            className="body"
            sx={{
              overflowY: "auto",
              height: "25em",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: ".5em",
              borderRadius: "20px",
            }}
          >
            {/* Either have two lists side by side or have one list with two cards side by side
            option 2 works best if members are nested in the tractates 
            option 1 would have to have the same length as tractates and if there are no members, display "empty" */}
            <List
              sx={{
                width: "100%",
                gap: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* // TODO: change map, keys, and name to tractates */}
              {states.map((state, index) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "95%",
                    gap: 1,
                  }}
                >
                  <ListItem
                    sx={{
                      backgroundColor: "var(--light-grey)",
                      borderRadius: "20px",
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    key={state}
                  >
                    <Typography
                      sx={{ fontSize: ".9em", color: "var(--brown)" }}
                    >
                      {state}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      backgroundColor: "var(--light-grey)",
                      borderRadius: "20px",
                      padding: ".7em",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    key={index}
                  >
                    {/*// TODO: change map to names */}
                    {word.map((w, index) => {
                      return (
                        <Typography key={index}
                          sx={{ fontSize: ".8em", color: "var(--brown)" }}
                        >
                          {w}
                          {index < word.length - 1 && ","}
                        </Typography>
                      );
                    })}
                  </ListItem>
                </Box>
              ))}
            </List>
          </Box>
        </Box>
      </div>
    </Dialog>
  );
}
