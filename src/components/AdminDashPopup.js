import states from "../utils/dataExports/StatesExports";
import {
  createCommunity,
  updateCommunity,
  deleteCommunity,
  createAdmin,
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
  Card,
  Divider,
} from "../utils/dataExports/muiExports";

// TODO: add ability to remove admin

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
  setAdminStatus,
  setCommunityAdmins,
  communityAdmins,
  setCurrentCommunity,
  currentCommunity,
}) {
  console.log("rows", rows);

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
          debugger;
          setAllCommunities(
            allCommunities.map((community) => {
              console.log("community: ", community);
              if (community.id === communityData.id) {
                // debugger;
                setCurrentCommunity({
                  ...currentCommunity,
                  name: communityData.name,
                  location: communityData.location,
                });
                // * the issue is with how the data is being sent up
                return createSuperData(
                  communityData.id,
                  communityData.name,
                  communityData.location,
                  communityData.members
                );
              }
              return { ...community };
            })
          );
          resetData();
        } catch (error) {
          console.error("Error updating community:", error);
          alert("Error updating community. Please try again.");
        }
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
        try {
          await deleteCommunity(communityData.id);
          setAllCommunities((prevCommunities) =>
            prevCommunities.filter(
              (community) => community.id !== communityData.id
            )
          );
          resetData();
          setAdminStatus("super");
        } catch (err) {
          console.log("Error deleting community: ", err);
          alert("Error deleting community. Please try again.");
        }
        break;
      case "addCommunityAdmin":
        if(e.nativeEvent.submitter.value === "add"){
          // await createAdmin(user_id, community_id)
          const user = rows.find((user) => user.id === userData.id);
          const firstName = user.name.split(" ")[0];
          const lastName = user.name.split(" ").at(-1);
  
          setCommunityAdmins([
            ...communityAdmins,
            { first_name: firstName, last_name: lastName, id: user.id },
          ]);
        } else {
          // TODO: update state and trigger fetch
          // ! atm need admin id so till then we wait for updated endpoint
        }

        resetData();
        break;
      default:
        console.log("Invalid popupStatus");
        break;
    }
  };

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const resetData = () => {
    setPopup(false);
    setPopupStatus("");
    setCommunityData({
      name: "",
      location: "",
      members: [],
      id: "",
    });
    setUserData({
      id: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      community_id: "",
      phone_number: "",
      is_community_admin: false,
      goal: 0,
    });
  };

  return (
    <Dialog
      open={true}
      className="popup-overlay"
      onClose={() => resetData()}
      PaperComponent={Card}
    >
      <div
        className="popup-card"
        style={{
          position: "relative",
          height: "23em",
          width: "20em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => resetData()}
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
                sx={{
                  width: "90%",
                  marginBottom: "1em",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--orange-light)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--orange)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiSelect-select": {
                    color: "black",
                  },
                }}
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
                style={{
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
        )}
        {popupStatus === "editCommunity" && (
          <Box>
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
                sx={{
                  width: "90%",
                  marginBottom: "1em",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--orange-light)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--orange)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiSelect-select": {
                    color: "black",
                  },
                }}
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
                style={{
                  backgroundColor: "var(--orange)",
                  width: "90%",
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                Update Community
              </Button>
            </form>
            <Button
              sx={{
                position: "absolute",
                bottom: "1px",
                textTransform: "none",
              }}
              color="error"
              onClick={() => {
                setPopupStatus("deleteCommunity");
              }}
            >
              Delete Community
            </Button>
          </Box>
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
            {/* <Typography style={{ marginRight: "1em" }}>Admin Status</Typography>
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
                      backgroundColor: "var(--light-blue)",
                    },
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "var(--light-blue)",
                    },
                  }}
                />
              }
              label={`${is_community_admin ? "Admin" : "Member"}`}
            /> */}
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "var(--orange)",
                width: "90%",
                marginTop: "1em",
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Update User
            </Button>
          </form>
        )}
        {popupStatus === "viewMember" && (
          <Box>
            <Typography variant="h5" sx={{ marginTop: "1em" }}>
              User Details
            </Typography>
            <Divider variant="middle" sx={{ marginTop: ".5em" }} />
            <Typography variant="h6">
              {first_name} {last_name}
            </Typography>
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
                <Typography variant="body2">{email}</Typography>
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
                <Typography variant="body2">{phone_number}</Typography>
              </Box>
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "1em",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" sx={{ paddingRight: "20px" }}>
                  Admin
                </Typography>
                <Typography variant="body2">
                  {is_community_admin ? "Yes" : "No"}
                </Typography>
              </Box> */}
            </Box>
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
                      color: "var(--light-blue)",
                      height: "12px",
                      width: "12px",
                    },
                    "& .MuiSlider-track": {
                      color: "var(--light-blue)",
                    },
                    "& .MuiSlider-rail": {
                      color: "var(--light-grey)",
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
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Edit User
            </Button>
          </Box>
        )}
        {popupStatus === "deleteCommunity" && (
          <Box
            sx={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              width: "90%",
              marginTop: "2em",
              position: "relative",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Are you sure you want to delete this community?
            </Typography>
            <Button
              color="error"
              sx={{
                position: "absolute",
                bottom: "1px",
                textTransform: "none",
                boxShadow: "none",
              }}
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={(e) => handleSubmit(e)}
            >
              Delete
            </Button>
          </Box>
        )}
        {popupStatus === "addCommunityAdmin" && (
          <div>
            <Typography variant="h5" sx={{ marginTop: "1em" }}>
              Add Community Admin
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-select-state"
                select
                label="Member"
                value={userData.id || ""}
                onChange={(e) => {
                  setUserData({ ...userData, id: e.target.value });
                }}
                defaultValue="Select Member"
                sx={{
                  width: "100%",
                  marginBottom: "1em",
                  marginTop: "2em",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--orange-light)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--orange)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiSelect-select": {
                    color: "black",
                  },
                }}
              >
                <MenuItem disabled value="">
                  <em>Select member</em>
                </MenuItem>
                {rows.map((member, index) => (
                  <MenuItem key={index} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  bottom: "3em",
                  gap: 1,
                  width: "100%",
                }}
              >
                <Button
                  type="submit"
                  value="add"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    boxShadow: "none",
                    backgroundColor: "var(--orange)",
                    width: "40%",
                  }}
                >
                  Make Admin
                </Button>
                <Button
                  type="submit"
                  value="remove"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    boxShadow: "none",
                    backgroundColor: "var(--black)",
                    width: "40%",
                  }}
                >
                  Remove Admin
                </Button>
              </Box>
            </form>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default AdminDashPopup;
