import states from "../utils/dataExports/StatesExports";
import {
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../utils/API/CommunityAPI";
import {
  Button,
  DeleteIcon,
  Dialog,
  TextField,
  MenuItem,
  CloseRoundedIcon,
  Typography,
  Box,
  Slider,
} from "../utils/dataExports/muiExports";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// TODO: add make admin to edit member and show if admin or not

// secondary:
// TODO: get users progress

function AdminDashPopup({
  setUserData,
  userData,
  setPopup,
  setPopupStatus,
  communityData,
  setCommunityData,
  popupStatus,
  capitalizeWord,
  allCommunities,
  setAllCommunities,
  rows,
  setRows,
  createSuperData,
}) {
  console.log("user data admin popup", userData);

  const {
    username,
    first_name,
    last_name,
    email,
    community_id,
    phone_number,
    goal,
    is_community_admin,
  } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (popupStatus) {
      case "addCommunity":
        if (communityData.name === "" || communityData.location === "") {
          alert("Please fill out all fields");
          return;
        }
        try {
          await createCommunity(communityData);
          setRows([
            ...rows,
            createSuperData(
              communityData.id,
              communityData.name,
              communityData.location,
              []
            ),
          ]);
          setPopup(false);
          setPopupStatus("");
        } catch (error) {
          console.error("Error creating community:", error);
          alert("Error creating community. Please try again.");
        }
        break;
      case "editCommunity":
        if (communityData.name === "" || communityData.location === "") {
          alert("Please fill out all fields");
          return;
        }
        try {
          await updateCommunity(communityData);
          setAllCommunities(
            allCommunities.map((community) => {
              if (community.id === communityData.id) {
                return createSuperData(
                  communityData.id,
                  communityData.name,
                  communityData.location,
                  communityData?.members
                );
              }
              return { ...community };
            })
          );
          setPopup(false);
        } catch (error) {
          console.error("Error updating community:", error);
          alert("Error updating community. Please try again.");
        }
        break;
      case "addCommunityAdmin":
        // do i update admin or community?
        break;
      case "createMember":
        // createUser(userData)
        //? should admin create all fields or at least have option?
        // * user data:
        // username: "",
        // email: "",
        // phone_number: "",
        // first_name: "",
        // last_name: "",
        // location: "", //[select state]
        // password: "",
        // password_confirmation: "",
        // community_id: int || null || "", //[select community. value is id]
        // is_community_admin: "true" || "false"
        break;
      case "editMember":
        // check each field to see if empty if yes alert
        try {
          // ! route to is update me, not any user
          // await updateUser({
          //   first_name: userData.first_name,
          //   last_name: userData.last_name,
          //   // is_community_admin: userData.is_community_admin
          // });
        } catch (e) {
          console.error("Error updating user:", e);
          alert("Error updating user. Please try again.");
        }
        break;
      case "deleteCommunity":
        debugger;
        await deleteCommunity(communityData.id);
        break;
      default:
        console.log("Invalid popupStatus");
        break;
    }
  };

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={true}
      className="popup-overlay"
      onClose={() => setPopup(false)}
      PaperComponent={"Card"}
    >
      <div
        className="popup-card"
        style={{
          position: "relative",
          height: "23em",
          width: "20em",
        }}
      >
        <Button
          onClick={() => {
            setPopup(false);
            setPopupStatus("");
            setCommunityData({
              name: "",
              location: "",
              members: [],
              id: "",
            });
          }}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseRoundedIcon style={{ color: "var(--orange)" }} />
        </Button>
        {popupStatus === "addCommunity" && (
          <div>
            <Typography variant="h5" sx={{ marginTop: "1em" }}>
              Add Community
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="name"
                label="Community Name"
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
                style={{ width: "90%", marginBottom: "1em", marginTop: "2em" }}
              />
              <TextField
                id="outlined-select-state"
                select
                label="State"
                name="location"
                value={capitalizeWord(communityData.location)}
                onChange={(e) =>
                  setCommunityData({
                    ...communityData,
                    location: e.target.value,
                  })
                }
                defaultValue="Select state"
                style={{ width: "90%", marginBottom: "1em" }}
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
                style={{ backgroundColor: "var(--orange)", width: "90%" }}
              >
                Create Community
              </Button>
            </form>
          </div>
        )}
        {popupStatus === "editCommunity" && (
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ marginTop: "1em" }}>
              Edit Community
            </Typography>
            <TextField
              id="name"
              label="Community Name"
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
              style={{ width: "90%", marginBottom: "1em", marginTop: "2em" }}
            />
            <TextField
              id="outlined-select-state"
              select
              label="State"
              name="location"
              value={capitalizeWord(communityData.location)}
              onChange={(e) =>
                setCommunityData({
                  ...communityData,
                  location: e.target.value,
                })
              }
              defaultValue="Select state"
              style={{ width: "90%", marginBottom: "1em" }}
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
              style={{ backgroundColor: "var(--orange)", width: "90%" }}
            >
              Update Community
            </Button>
          </form>
        )}
        {popupStatus === "addCommunityAdmin" && (
          <h2>Add Community Admin drop or search for user and community</h2>
        )}
        {popupStatus === "editMember" && (
          //? what info should admin/super be allowed to edit
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ marginTop: "1em" }}>
              Edit User
            </Typography>
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              type="text"
              name="first_name"
              value={first_name}
              onChange={handleUserDataChange}
              style={{ width: "90%", marginBottom: "1em", marginTop: "2em" }}
            />
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              type="text"
              name="last_name"
              value={last_name}
              onChange={handleUserDataChange}
              style={{ width: "90%", marginBottom: "1em" }}
            />
            <Typography style={{ marginRight: "1em" }}>Admin Status</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={is_community_admin}
                  onChange={() =>
                    setUserData({
                      ...userData,
                      is_community_admin: !is_community_admin,
                    })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "var(--orange)",
                    },
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "var(--orange)",
                    },
                  }}
                />
              }
              label={`${is_community_admin ? "Admin" : "Member"}`}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "var(--orange)",
                width: "90%",
                marginTop: "1em",
              }}
            >
              Update User
            </Button>
          </form>
        )}
        {/* {popupStatus === "createMember" && (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                name:
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) =>
                    setUserData({ ...userData, first_name: e.target.value })
                  }
                />
              </label>
              <label>
                last name:
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) =>
                    setUserData({ ...userData, last_name: e.target.value })
                  }
                />
              </label>
              <label>
                Make Admin:
                <input
                  name="is_community_admin"
                  type="checkbox"
                  checked={is_community_admin}
                  value={is_community_admin}
                  onChange={() =>
                    setUserData({
                      ...userData,
                      is_community_admin: !is_community_admin,
                    })
                  }
                />
              </label>
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        )} */}
        {popupStatus === "viewMember" && (
          <div>
            <Typography variant="h5" sx={{ marginTop: "1em" }}>
              User Details
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: " wrap",
                alignContent: "center",
                alignItems: "flex-start",
                width: "90%",
                marginBottom: "1em",
                marginTop: "2em",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Typography variant="body1" sx={{ marginTop: "1em" }}>
                Name: {first_name} {last_name}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "1em" }}>
                Email: {email}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "1em" }}>
                Phone: {phone_number}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "1em" }}>
                Admin status: {is_community_admin ? "Yes" : "No"}
              </Typography>
            </div>
            <Box
              className="progressBarContainer"
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <Box sx={{ width: "100%", mr: 1 }}>
                <Slider
                  disabled
                  defaultValue={goal}
                  aria-label="Disabled slider"
                  sx={{
                    "& .MuiSlider-thumb": {
                      color: "var(--orange)",
                      height: "12px",
                      width: "12px",
                    },
                    "& .MuiSlider-track": {
                      color: "var(--orange)",
                    },
                    "& .MuiSlider-rail": {
                      color: "var(--orange-light)",
                    },
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {` ${goal}%`}
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={() => setPopupStatus("editMember")}
              variant="contained"
              style={{
                backgroundColor: "var(--orange)",
                width: "90%",
                marginTop: "1em",
              }}
            >
              Edit User
            </Button>
          </div>
        )}
        {popupStatus === "deleteCommunity" && (
          <div
            style={{
              position: "absolute",
              width: "90%",
              marginTop: "2em",
            }}
          >
            <Typography variant="h5">
              Are you sure you want to delete this community?
            </Typography>
            <Button
              color="error"
              sx={{ marginTop: "3em" }}
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={(e) => handleSubmit(e)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default AdminDashPopup;
