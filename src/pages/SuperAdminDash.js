import {
  Button,
  Card,
  CloseRoundedIcon,
  Dialog,
  MenuItem,
  TextField,
  Typography,
} from "../utils/dataExports/muiExports";
import { useEffect, useState } from "react";
import { createCommunity } from "../utils/API/CommunityAPI";
import { useCommunity } from "../utils/context/CommunityContext";
import DashboardTable from "../components/DashboardTable";
import states from "../utils/dataExports/StatesExports";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 170 },
  { id: "members", label: "Members", align: "right", minWidth: 170 },
  { id: "goal", label: "Community goal", align: "right", minWidth: 170 },
];

function createData(id, name, location, members = 0, community_goal) {
  const completedPages = community_goal?.community_total_completed_pages || 0;
  const selectedPages = community_goal?.community_total_selected_pages || 0;
  const goal =
    selectedPages > 0
      ? `${((completedPages / selectedPages) * 100).toFixed(2)}%`
      : "0%";
  return { id, name, location, members, goal };
}

export default function SuperAdminDash() {
  const [rows, setRows] = useState([]);
  const [popup, setPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [communityData, setCommunityData] = useState({
    name: "",
    location: "",
    members: 0,
    id: "",
    community_goal: {},
  });

  const navigate = useNavigate();
  const { allCommunities, getAllCommunityData } = useCommunity();

  function capitalizeWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  useEffect(
    function setData() {
      let updatedRows = [];

      getAllCommunityData();
      allCommunities.map((community) => {
        updatedRows.push(
          createData(
            community?.id,
            community?.name,
            capitalizeWord(community?.location),
            community?.members?.length,
            community?.community_goal?.[0]
          )
        );
      });
      setRows(updatedRows);
    },
    [allCommunities]
  );

  const handleRowClick = (row) => {
    navigate(`/dashboard/${row.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (communityData.name === "" || communityData.location === "") {
      setErrorMessage({ error: "Please fill in all required fields." });
      return;
    }
    try {
      await createCommunity(communityData);
      setRows([
        ...rows,
        createData(
          communityData.id,
          communityData.name,
          communityData.location,
          0
        ),
      ]);
      reset();
    } catch (error) {
      console.error("Error creating community:", error);
      alert("Error creating community. Please try again.");
    }
  };

  const reset = () => {
    setErrorMessage(null);
    setPopup(false);
    setCommunityData({
      name: "",
      location: "",
      members: 0,
      id: "",
      community_goal: {},
    });
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            marginLeft: "20px",
            bgcolor: "var(--orange)",
            textTransform: "none",
            boxShadow: "none",
            borderRadius: "13px",
          }}
          onClick={() => {
            setPopup(true);
          }}
        >
          Add Community
        </Button>
      </div>
      <DashboardTable
        columns={columns}
        rows={rows}
        handleOpenRow={handleRowClick}
      />
      <Dialog
        open={popup}
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
          <div>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: ".7em",
              }}
            >
              Add Community
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
              error={errorMessage}
                helperText={errorMessage?.error}
                id="name"
                label="*Community Name"
                variant="outlined"
                type="text"
                name="name"
                value={communityData.name}
                onChange={(e) =>
                  setCommunityData({
                    ...communityData,
                    name: e.target.value,
                  })
                }
                sx={{ marginTop: "2em" }}
              />
              <TextField
                error={errorMessage}
                helperText={errorMessage?.error}
                id="outlined-select-state"
                select
                label="*State"
                name="location"
                value={capitalizeWord(communityData.location)}
                onChange={(e) =>
                  setCommunityData({
                    ...communityData,
                    location: e.target.value,
                  })
                }
                defaultValue="Select state"
              >
                {states.map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "var(--orange)",
                  width: "90%",
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Create Community
              </Button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
