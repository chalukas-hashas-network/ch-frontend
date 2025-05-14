import states from "../utils/dataExports/StatesExports";
import {
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
  Card,
  Divider,
} from "../utils/dataExports/muiExports";
import { useCommunity } from "../utils/context/CommunityContext";
import { useNavigate } from "react-router-dom";

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
  setCommunityAdmins,
  communityAdmins,
}) {
  const { username, first_name, last_name, email, phone_number, goal, community_id } =
    userData;

  const { allCommunities, setAllCommunities } = useCommunity();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (popupStatus) {
      case "editCommunity":
        if (communityData.name === "" || communityData.location === "") {
          alert("Please fill out all fields");
          return;
        }
        try {
          await updateCommunity(communityData);
          setAllCommunities(
            allCommunities.map((community) =>
              community.id === communityData.id
                ? {
                    ...community,
                    name: communityData.name,
                    location: communityData.location,
                  }
                : community
            )
          );

          setCommunityData((prev) =>
            prev?.id === communityData.id
              ? {
                  ...prev,
                  name: communityData.name,
                  location: communityData.location,
                }
              : prev
          );

          resetData();
        } catch (error) {
          console.error("Error updating community:", error);
          alert("Error updating community. Please try again.");
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
          navigate("/dashboard");
        } catch (err) {
          console.log("Error deleting community: ", err);
          alert("Error deleting community. Please try again.");
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
      case "editCommunityAdmin":
        // TODO: trigger fetch
        // ! atm need admin id so till then we wait for updated endpoint

        setCommunityAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.id !== userData.id)
        );

        resetData();
        break;
      case "addAdmin":
        // await createAdmin(user_id, community_id)
        const user = communityData.members?.find(
          (user) => user.id === userData.id
        );
        setCommunityAdmins([
          ...communityAdmins,
          {
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
          },
        ]);

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
    setUserData({
      id: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      community_id: "",
      phone_number: "",
      goal: 0,
    });
  };

  return (
    <Dialog
      open={true}
      onClose={() => resetData()}
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
          onClick={() => resetData()}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseRoundedIcon style={{ color: "var(--orange)" }} />
        </Button>
        {popupStatus === "editCommunity" && (
          <Box>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Nexa, sans-serif",
                  color: "var(--brown)",
                  marginTop: ".7em",
                }}
              >
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
                sx={{ marginTop: "2em" }}
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
                Update Community
              </Button>
            </form>
            <Button
              sx={{
                position: "absolute",
                bottom: "1em",
                right: "2em",
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
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: ".7em",
              }}
            >
              Are you sure you want to delete this community?
            </Typography>
            <Box sx={{ position: "absolute", bottom: "1px" }}>
              <Button
                sx={{
                  bgcolor: "var(--dark-grey)",
                  color: "var(--black)",
                  textTransform: "none",
                  boxShadow: "none",
                  marginRight: "2em",
                }}
                variant="contained"
                onClick={() => setPopupStatus("editCommunity")}
              >
                Cancel
              </Button>
              <Button
                color="error"
                sx={{
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
          </Box>
        )}
        {popupStatus === "editMember" && (
          //? what info should admin/super be allowed to edit
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: ".7em",
              }}
            >
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
              style={{ marginTop: "2em" }}
            />
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              type="text"
              name="last_name"
              value={last_name}
              onChange={handleUserDataChange}
            />
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
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: ".7em",
              }}
            >
              User Details
            </Typography>
            <Divider variant="middle" sx={{ marginTop: ".5em" }} />
            <Typography variant="h6" sx={{ marginTop: ".5em" }}>
              {capitalizeWord(first_name)} {capitalizeWord(last_name)}
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
            </Box>
            <Divider variant="middle" sx={{ marginTop: ".5em" }} />
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
                      width: `${parseFloat(goal)}%`,
                      bgcolor: "var(--light-blue)",
                      borderRadius: "20px",
                      marginLeft: "7px",
                    }}
                  />
                  <Box
                    className="progressNumber"
                    sx={{
                      left: `${parseFloat(goal)}%`,
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
                      {goal}%
                    </Typography>
                  </Box>
                </Box>
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
        {popupStatus === "addAdmin" && (
          <form onSubmit={handleSubmit} style={{ minWidth: "90%" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: "1em",
              }}
            >
              Add a new Admin
            </Typography>
            <TextField
              id="outlined-select-member"
              select
              label="Select Member"
              value={userData.id || ""}
              onChange={(e) => {
                setUserData({ ...userData, id: e.target.value });
              }}
              sx={{
                marginTop: "2em",
              }}
            >
              <MenuItem value="">
                <em>Select member</em>
              </MenuItem>
              {communityData.members.map((member, index) => (
                <MenuItem key={index} value={member.id}>
                  {capitalizeWord(member.first_name)} {capitalizeWord(member.last_name)}
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
                variant="contained"
                onClick={() => setPopupStatus("editCommunityAdmin")}
                sx={{
                  textTransform: "none",
                  boxShadow: "none",
                  backgroundColor: "var(--orange)",
                  width: "35%",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={userData.id === ""}
                sx={{
                  textTransform: "none",
                  boxShadow: "none",
                  backgroundColor: "var(--brown)",
                  width: "40%",
                }}
              >
                Add Admin
              </Button>
            </Box>
          </form>
        )}
        {popupStatus === "editCommunityAdmin" && (
          <form onSubmit={handleSubmit} style={{ minWidth: "90%" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: "1em",
              }}
            >
              Edit Community Admin
            </Typography>
            <TextField
              id="outlined-select-admin"
              select
              label="Select Admin"
              value={userData.id || ""}
              onChange={(e) => {
                setUserData({ ...userData, id: e.target.value });
              }}
              sx={{
                marginTop: "2em",
              }}
            >
              <MenuItem value="">
                <em>Select admin</em>
              </MenuItem>
              {communityAdmins.map((admin, index) => (
                <MenuItem key={index} value={admin.id}>
                  {capitalizeWord(admin.first_name) + " " + capitalizeWord(admin.last_name)}
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
                variant="contained"
                sx={{
                  textTransform: "none",
                  boxShadow: "none",
                  backgroundColor: "var(--orange)",
                  width: "40%",
                }}
                onClick={() => setPopupStatus("addAdmin")}
              >
                Add Admins
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={userData.id === ""}
                sx={{
                  textTransform: "none",
                  boxShadow: "none",
                  backgroundColor: "var(--brown)",
                  width: "40%",
                }}
              >
                Remove Admin
              </Button>
            </Box>
          </form>
        )}
      </div>
    </Dialog>
  );
}

export default AdminDashPopup;
