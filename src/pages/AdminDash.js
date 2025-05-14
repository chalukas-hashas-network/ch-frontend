import {
  Button,
  Box,
  Typography,
  ArrowBackIcon,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
} from "../utils/dataExports/muiExports";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useUser } from "../utils/context/UserContext";
import AdminDashPopup from "../components/AdminDashPopup";
import {
  queryCommunities,
  createCommunity,
  updateCommunity,
} from "../utils/API/CommunityAPI";
import { findUserById, queryUsers } from "../utils/API/UserAPI";
import { useCommunity } from "../utils/context/CommunityContext";
import DashboardTable from "../components/DashboardTable";

// TODO: add validations and error handling to the forms

/* 
super admin:
- create communities
- assign admin to community
- has full CRUD ability for everything

Admin:
- has full CRUD ability for members of the community

filter and search ability
sort by (a-z) name, location, goalComplete

When admin goes to dash, if its admin then the admins community members will show, 
if its a superuser then all communities will show.

Superuser status: when he clicks on a community, the state status changes to admin and renders that community
when he goes back the status changes back to super. Add community is only visible for superusers

Admin status: when he clicks on a member, a popup of the members data is shown with edit and delete buttons
All admins have add (create) new member and add community admin
*/

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
];

function createData(id, first_name, last_name, email) {
  const name = first_name + " " + last_name;
  return { name, id, email };
}

function AdminDash() {
  const [communityAdmins, setCommunityAdmins] = useState([]);
  const [rows, setRows] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [communityData, setCommunityData] = useState({
    name: "",
    location: "",
    members: [],
    id: "",
    goal: 0,
  });
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    community_id: "",
    phone_number: "",
    goal: 0,
  });

  const { allCommunities, getAllCommunityData } = useCommunity();
  const { community_id } = useParams();
  const { isSuperAdmin, user } = useUser();

  useEffect(
    function setDataBasedOffStatus() {
      getAllCommunityData();
      let updatedRows = [];
      let admins = [];

      const fetchAdminData = async () => {
        const communityId = isSuperAdmin
          ? Number(community_id)
          : user?.community?.id;

        const selected_community = allCommunities.find(
          (c) => c.id === communityId
        );

        // set community goal
        const goal = selected_community?.community_goal?.[0];
        const goalPercentage = goal
          ? parseFloat(
              (goal?.community_total_completed_pages /
                goal?.community_total_selected_pages) *
                100
            ).toFixed(2)
          : "0";

        const members = selected_community?.members;

        setCommunityData({
          name: selected_community?.name,
          location: selected_community?.location,
          id: selected_community?.id,
          members: members,
          goal: goalPercentage,
        });

        if (members?.length > 0) {
          members.map((member) => {
            updatedRows.push(
              createData(
                member?.id,
                member?.first_name,
                member?.last_name,
                member?.email
              )
            );

            // check if member is an admin
            if (
              selected_community?.community_admins?.includes(
                member.first_name + " " + member.last_name
              )
            ) {
              admins.push(member);
            }
          });
        }
        setCommunityAdmins(admins); // Update the state with the communities admins
        setRows(updatedRows); // Update the state with the new rows
      };

      fetchAdminData();

      setRows(updatedRows);
    },
    [allCommunities, community_id]
  );

  function capitalizeWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const handleOpenRow = async (row) => {
    try {
      const userData = await findUserById(row?.id);
      console.log("userData: ", userData);
      setUserData({
        username: userData?.username,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        phone_number: userData?.phone_number,
        goal: userData?.goal?.user_percentage_completed,
        community_id: userData?.community?.id,
      });
      setPopup(true);
      setPopupStatus("viewMember");
    } catch (e) {
      console.error("Error fetching user data:", e);
      alert("Error fetching user data. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "2em" }}>
      {isSuperAdmin && (
        <Link
          style={{
            textDecoration: "none",
            color: "var(--black)",
            marginLeft: "2em",
            position: "relative",
          }}
          to="/dashboard"
        >
          <ArrowBackIcon />
        </Link>
      )}
      <Box
        className="adminHeader"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          className="editButtons"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            marginRight: { md: "6em", xs: "1em" },
            marginBottom: { md: "1em", xs: ".5em" },
          }}
        >
          {isSuperAdmin && (
            <>
              {/* <Button
          style={{ marginLeft: "20px", color: "var(--orange)" }}
          onClick={() => {
            setCommunityData({
              name: currentCommunity?.name,
              location: currentCommunity?.location,
              members: currentCommunity?.members,
              id: currentCommunity?.id,
            });
            setPopup(true);
            setPopupStatus("editCommunity");
          }}
        >
          Create community Goal
        </Button> */}
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
                  setPopupStatus("editCommunity");
                }}
              >
                Edit Community
              </Button>
            </>
          )}
          <Button
            variant="contained"
            sx={{
              marginLeft: "20px",
              bgcolor: "var(--black)",
              textTransform: "none",
              boxShadow: "none",
              borderRadius: "13px",
            }}
            onClick={() => {
              setPopup(true);
              setPopupStatus("editCommunityAdmin");
            }}
          >
            Edit Admins
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          }}
        >
          <Box
            className="communityAdmins"
            sx={{
              backgroundColor: "white",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: { xs: "90dvw", md: "40dvw" },
              maxWidth: 500,
              flex: 1,
              maxHeight: 150,
              padding: 2,
              border: "1px solid var(--light-grey)",
            }}
          >
            <Typography
              variant="button"
              sx={{ fontSize: ".8em", lineHeight: "5px" }}
            >
              Community Admins
            </Typography>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                overflowY: "auto",
                maxHeight: "100%",
                marginTop: "7px",
              }}
            >
              {communityAdmins.length > 0 ? (
                communityAdmins.map((admin, index) => {
                  return (
                    <ListItem alignItems="flex-start" key={index}>
                      <ListItemButton
                        onClick={() => {
                          console.log(admin.first_name, " clicked");
                          handleOpenRow(admin);
                        }}
                        sx={{
                          bgcolor: "#F5F5F5",
                          borderRadius: "16px",
                          height: "30px",
                        }}
                      >
                        <ListItemText
                          primary={`${capitalizeWord(
                            admin.first_name
                          )} ${capitalizeWord(admin.last_name)}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })
              ) : (
                <ListItem
                  sx={{
                    bgcolor: "#F5F5F5",
                    borderRadius: "16px",
                    height: "35px",
                  }}
                >
                  <ListItemText primary="No Admins yet" />
                </ListItem>
              )}
            </List>
          </Box>
          <Box
            className="communityInfoBox"
            sx={{
              border: "1px solid var(--light-grey)",
              bgcolor: "white",
              borderRadius: "16px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "90dvw", md: "40dvw" },
              maxWidth: 500,
              padding: 2,
              flex: 1,
            }}
          >
            <Box
              className="communityName"
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1em",
                marginBottom: { md: "1em" },
              }}
            >
              <Typography variant="h6">{communityData.name}</Typography>
              <Typography variant="body2">
                In {communityData.location}
              </Typography>
            </Box>
            <Box
              className="communityGoal"
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "10px",
                alignItems: "center",
                width: "90%",
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
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    overflow: "visible",
                  }}
                >
                  <Box
                    className="innerBar"
                    sx={{
                      height: "20px",
                      width: `${parseFloat(communityData?.goal)}%`,
                      bgcolor: "var(--light-blue)",
                      borderRadius: "20px",
                      marginLeft: "15px",
                    }}
                  />
                  <Box
                    className="progressNumber"
                    sx={{
                      left: `${parseFloat(communityData?.goal)}%`,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "15px",
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
                      {communityData?.goal}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <DashboardTable
        columns={columns}
        rows={rows}
        handleOpenRow={handleOpenRow}
      />
      {popup && (
        <AdminDashPopup
          userData={userData}
          setUserData={setUserData}
          setPopup={setPopup}
          popupStatus={popupStatus}
          setPopupStatus={setPopupStatus}
          communityData={communityData}
          setCommunityData={setCommunityData}
          capitalizeWord={capitalizeWord}
          setCommunityAdmins={setCommunityAdmins}
          communityAdmins={communityAdmins}
        />
      )}
    </div>
  );
}

export default AdminDash;
