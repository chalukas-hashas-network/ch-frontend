import { useState, useEffect, Fragment } from "react";
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
  Divider,
  Badge,
} from "../utils/dataExports/muiExports";
import { useUser } from "../utils/context/UserContext";

export default function ChavrusaPopup({
  popupCard,
  setPopupCard,
  reset,
  selectedChavrusa,
  getChavrusaInfo,
}) {
  const { user } = useUser();

  console.log("selectedChavrusa", selectedChavrusa);

  const chavrusa = [
    {
      id: 1,
      name: "Chavrusa Name",
      tractate: ["Tractate 1", "Tractate 2", "Tractate 3", "Tractate 4"],
    },
    {
      id: 2,
      name: "Another Chavrusa",
      tractate: [
        "Tractate A",
        "Tractate B",
        "some other tractate",
        "another large tractate",
      ],
    },
    {
      id: 13,
      name: "Chavrusa Name",
      tractate: ["Tractate 1", "Tractate 2", "Tractate 3"],
    },
    {
      id: 12,
      name: "Another Chavrusa",
      tractate: ["Tractate A", "Tractate B"],
    },
    {
      id: 11,
      name: "Chavrusa Name",
      tractate: ["Tractate 1", "Tractate 2", "Tractate 3"],
    },
    {
      id: 32,
      name: "Another Chavrusa",
      tractate: ["Tractate A", "Tractate B"],
    },
    {
      id: 41,
      name: "Chavrusa Name",
      tractate: ["Tractate 1", "Tractate 2", "Tractate 3"],
    },
    {
      id: 42,
      name: "Another Chavrusa",
      tractate: ["Tractate A", "Tractate B"],
    },
  ];

  return (
    <div
      className="popup-card"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "1em",
      }}
    >
      <Button
        onClick={() => reset()}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        <CloseRoundedIcon style={{ color: "var(--orange)" }} />
      </Button>
      {popupCard.status === "viewChavrusaInfo" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Nexa, sans-serif",
              color: "var(--brown)",
              marginTop: ".7em",
              fontSize: "1.3em",
            }}
          >
            User Profile
          </Typography>
          <Divider flexItem variant="middle" sx={{ marginTop: "1em" }} />
          <Typography
            sx={{
              color: "var(--black)",
              marginTop: ".7em",
              fontSize: "1.5em",
            }}
          >
            {selectedChavrusa?.first_name} {selectedChavrusa?.last_name}
          </Typography>
          {/* 
          // TODO: once backend is updated and i can get tractates, add dropdown to see the goal and page completed for each tractate
        //   TODO: if chavrusa is already your chavrusa, remove request button
          */}
          <Box
            className="userInfo"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: " wrap",
              alignContent: "center",
              alignItems: "flex-start",
              width: "90%",
              marginBottom: "1em",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1em",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ paddingRight: "25px" }}>
                Email
              </Typography>
              <Typography variant="body2">{selectedChavrusa?.email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "1em",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ paddingRight: "19px" }}>
                Phone
              </Typography>
              <Typography variant="body2">
                {selectedChavrusa?.phone_number}
              </Typography>
            </Box>
          </Box>
          <Divider flexItem variant="middle" sx={{ marginTop: ".5em" }} />
          <Box
            className="progressBarContainer"
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
              alignItems: "center",
              width: "90%",
              marginTop: "1em",
              marginBottom: "1.5em",
            }}
          >
            <Box sx={{ width: "90%" }}>
              <Typography variant="subtitle2" sx={{ paddingLeft: "14px" }}>
                Goal Progress
              </Typography>

              <Box
                className="progressBar"
                sx={{
                  width: "100%",
                  bgcolor: "var(--light-grey)",
                  borderRadius: "20px",
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
                      selectedChavrusa?.goal?.user_percentage_completed
                    )}%`,
                    bgcolor: "var(--light-blue)",
                    borderRadius: "20px",
                    marginLeft: "7px",
                  }}
                />
                <Box
                  className="progressNumber"
                  sx={{
                    left: `${parseFloat(
                      selectedChavrusa?.goal?.user_percentage_completed
                    )}%`,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "7px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "var(--light-blue)",
                      fontSize: ".8em",
                      paddingLeft: "5px",
                    }}
                  >
                    {selectedChavrusa?.goal?.user_percentage_completed}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--orange)",
              textTransform: "none",
              boxShadow: "none",
              borderRadius: "13px",
              display: "block",
              marginTop: "1em",
            }}
          >
            Send Chavrusa Request
          </Button>
        </Box>
      )}
      {popupCard.status === "viewMyChavrusas" && (
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Typography
            sx={{
              fontFamily: "Nexa, sans-serif",
              color: "var(--brown)",
              marginTop: ".7em",
              fontSize: "1.3em",
            }}
          >
            My Chavrusas
          </Typography>
          <Box
            sx={{
              overflowY: "auto",
              height: "70%",
              borderRadius: "25px",
            }}
          >
            <List
              sx={{
                width: "100%",
                gap: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* {popupCard.chavrusas.map((chavrusa) => ( */}
              {chavrusa.map((chavrusa, index) => (
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    backgroundColor: "var(--light-grey)",
                    borderRadius: "20px",
                    maxWidth: "95%",
                    minHeight: "3.5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={chavrusa.id}
                >
                  <ListItemText
                    key={index}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: ".9rem",
                        },
                      },
                    }}
                    sx={{ width: 0 }}
                    // capitalize
                    primary={chavrusa.name}
                    secondary={
                      <Fragment>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 0.3,
                            flexWrap: "wrap",
                          }}
                        >
                          {chavrusa.tractate.map((tractate, index) => (
                            <Typography
                              sx={{ fontSize: ".8em", color: "var(--black)" }}
                            >
                              {tractate}
                              {index < chavrusa.tractate.length - 1 && ", "}
                            </Typography>
                          ))}
                        </Box>
                      </Fragment>
                    }
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--dark-grey)",
                      color: "var(--brown)",
                      fontSize: ".7em",
                      textTransform: "none",
                      boxShadow: "none",
                      borderRadius: "13px",
                      padding: "0.5em 1em",
                    }}
                    onClick={() => {
                      getChavrusaInfo(22);
                      // getChavrusaInfo(chavrusa.id);
                      setPopupCard({
                        isOpen: true,
                        status: "viewChavrusaInfo",
                      });
                    }}
                  >
                    View Profile
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "var(--brown)",
                color: "white",
                top: 20,
              },
            }}
            badgeContent={chavrusa.length}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "var(--orange)",
                textTransform: "none",
                boxShadow: "none",
                borderRadius: "13px",
                mt: 2,
              }}
              onClick={() => {
                setPopupCard({ ...popupCard, status: "viewRequests" });
              }}
            >
              view request
            </Button>
          </Badge>
        </Box>
      )}
      {popupCard.status === "viewRequests" && (
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Typography
            sx={{
              fontFamily: "Nexa, sans-serif",
              color: "var(--brown)",
              marginTop: ".7em",
              fontSize: "1.3em",
            }}
          >
            Chavrusa Requests
          </Typography>
          <Box
            sx={{
              overflowY: "auto",
              height: "72%",
              borderRadius: "25px",
            }}
          >
            <List
              sx={{
                width: "100%",
                gap: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* {popupCard.requests.map((request) => ( */}
              {chavrusa.map((request, index) => (
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    backgroundColor: "var(--light-grey)",
                    borderRadius: "20px",
                    maxWidth: "95%",
                    minHeight: "3.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={request.id}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <ListItemText
                      key={index}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: ".9rem",
                          },
                        },
                      }}
                      sx={{ width: 0 }}
                      //   capitalize
                      primary={request.name}
                      secondary={
                        <Fragment>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 0.3,
                              flexWrap: "wrap",
                            }}
                          >
                            {request.tractate.map((tractate, index) => (
                              <Typography
                                sx={{ fontSize: ".8em", color: "var(--black)" }}
                              >
                                {tractate}
                                {index < request.tractate.length - 1 && ", "}
                              </Typography>
                            ))}
                          </Box>
                        </Fragment>
                      }
                    />
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--dark-grey)",
                        color: "var(--brown)",
                        fontSize: ".7em",
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "13px",
                        height: "2.8em",
                        padding: "0.5em 1em",
                      }}
                      onClick={() => {
                        getChavrusaInfo(22);
                        // getChavrusaInfo(chavrusa.id);
                        setPopupCard({
                          isOpen: true,
                          status: "viewChavrusaInfo",
                        });
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      margin: ".5em",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "var(--brown)",
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "10px",
                        height: "2.5em",
                        width: "4em",
                        fontSize: ".7em",
                        marginLeft: "1em",
                      }}
                      onClick={() => {
                        // handle decline action
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "var(--orange)",
                        textTransform: "none",
                        boxShadow: "none",
                        borderRadius: "10px",
                        height: "2.5em",
                        width: "4em",
                        fontSize: ".7em",
                        marginRight: "1em",
                      }}
                      onClick={() => {
                        // handle accept action
                      }}
                    >
                      Accept
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--orange)",
              textTransform: "none",
              boxShadow: "none",
              borderRadius: "13px",
              mt: 1,
            }}
            onClick={() => {
              setPopupCard({ ...popupCard, status: "viewMyChavrusas" });
            }}
          >
            View Chavrusas
          </Button>
        </Box>
      )}
    </div>
  );
}
