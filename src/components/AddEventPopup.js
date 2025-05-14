import { useState } from "react";
import {
  Dialog,
  Button,
  CloseRoundedIcon,
  Card,
  Typography,
  TextField,
} from "../utils/dataExports/muiExports";

export default function AddEventPopup({ setAddEventPopup }) {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    host: "",
    address: "",
    date: "",
    time: "",
    rsvp: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("event", eventData)
  };

  const handleDataChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={true}
      onClose={() => setAddEventPopup(false)}
      PaperComponent={Card}
      sx={{height: "100%", backdropFilter: "blur(5px)"}}
    >
      <div
        className="popup-card"
        style={{
          height: "47em",
        }}
      >
        <Button
          onClick={() => {
            setAddEventPopup(false);
          }}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseRoundedIcon style={{ color: "var(--orange)" }} />
        </Button>
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Nexa, sans-serif",
              color: "var(--brown)",
              marginTop: ".7em",
            }}
          >
            Add Event
          </Typography>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            type="text"
            name="title"
            placeholder="e.g. Siyum BBQ"
            onChange={handleDataChange}
            sx={{marginTop: "1.5em"}}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            type="text"
            name="description"
            placeholder="Brief event description"
            multiline
            rows={4}
            onChange={handleDataChange}
            sx={{}}
          />
          <TextField
            id="host"
            label="Host Name"
            variant="outlined"
            type="text"
            name="name"
            
            placeholder="e.g. Rabbi Mendel"
            onChange={handleDataChange}
            sx={{}}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleDataChange}
            sx={{}}
          />
          <TextField
            id="date"
            label="Date"
            variant="outlined"
            type="date"
            name="date"
            focused
            value={eventData.date}
            onChange={handleDataChange}
            sx={{}}
          />
          <TextField
            id="time"
            label="Time"
            variant="outlined"
            type="time"
            name="time"
            focused
            value={eventData.time}
            onChange={handleDataChange}
            sx={{}}
          />
          <TextField
            id="rsvpUrl"
            label="RSVP Link"
            variant="outlined"
            type="text"
            name="rsvp"
            placeholder="https://docs.google.com/forms"
            helperText="Attach Google form or other link (optional)"
            onChange={handleDataChange}
            sx={{}}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "var(--brown)",
              boxShadow: "none",
              textTransform: "none",
              borderRadius: "10px",
              height: "3rem",
              width: "7rem",
              fontSize: ".9em",
              marginTop: ".5em",
              marginBottom: "1em"
            }}
          >
            Confirm
          </Button>
        </form>
      </div>
    </Dialog>
  );
}
