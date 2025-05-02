import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  DeleteIcon,
  Button,
  TextField,
  Box,
  LinearProgress,
  Typography,
  ArrowBackIcon,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
} from "../utils/dataExports/muiExports";
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useUser } from "../utils/Context";
import AdminDashPopup from "../components/AdminDashPopup";
import {
  queryCommunities,
  createCommunity,
  updateCommunity,
} from "../utils/API/CommunityAPI";
import { findUserById, queryUsers } from "../utils/API/UserAPI";

// for super, in community have a delete community button and add admin
// ! all edits and deletes should have a confirmation popup
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

const adminColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
];

const superColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 170 },
  { id: "members", label: "Members", align: "right", minWidth: 170 },
  { id: "goal", label: "Community goal", align: "right", minWidth: 170 },
  // issue with portraying members length when upading community
];

function createData(id, first_name, last_name, email) {
  const name = first_name + " " + last_name;
  return { name, id, email };
}

function createSuperData(id, name, location, members = 0, community_goal) {
  const completedPages = community_goal?.community_total_completed_pages || 0;
  const selectedPages = community_goal?.community_total_selected_pages || 0;
  const goal =
    selectedPages > 0
      ? `${((completedPages / selectedPages) * 100).toFixed(2)}%`
      : "0%";
  return { id, name, location, members, goal };
}

function AdminDash() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adminStatus, setAdminStatus] = useState("");
  const [communityAdmins, setCommunityAdmins] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState({
    name: "community",
    location: "location",
    goal: "0%",
  });
  const [allCommunities, setAllCommunities] = useState([]);
  const [rows, setRows] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [communityData, setCommunityData] = useState({
    name: "",
    location: "",
    members: 0,
    id: "",
    community_goal: {},
  });
  const [userData, setUserData] = useState({
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

  const { isSuperAdmin, user } = useUser();

  const columns = adminStatus === "super" ? superColumns : adminColumns;

  useEffect(
    function setStatus() {
      if (isSuperAdmin) {
        setAdminStatus("super");
      } else {
        setAdminStatus("admin");
        setCurrentCommunity({
          name: user.community.name,
          location: user.community.location,
          id: user.community.id,
        });
      }
    },
    [isSuperAdmin]
  );

  useEffect(
    function setDataBasedOffStatus() {
      let updatedRows = [];
      let admins = [];
      const fetchData = async () => {
        if (adminStatus === "super") {
          if (allCommunities.length === 0) {
            // If allCommunities is empty, fetch the communities
            try {
              const communities = await queryCommunities({}, [
                "include_members",
                "include_community_goal",
              ]);
              setAllCommunities(communities);
              communities.map((community) => {
                updatedRows.push(
                  createSuperData(
                    community?.id,
                    community?.name,
                    capitalizeWord(community?.location),
                    community?.members?.length,
                    community?.community_goal?.[0]
                  )
                );
              });
              setRows(updatedRows);
            } catch (e) {
              console.log(e);
            }
          } else {
            // If allCommunities is already populated, use it directly
            allCommunities.map((community) => {
              updatedRows.push(
                createSuperData(
                  community?.id,
                  community?.name,
                  capitalizeWord(community?.location),
                  community?.members?.length,
                  community?.community_goal?.[0]
                )
              );
            });
            setRows(updatedRows);
          }
        } else if (adminStatus === "admin") {
          // Fetch a specific community if the adminStatus is admin
          const communityId = isSuperAdmin
            ? currentCommunity?.id
            : user?.community?.id;

          const selected_community = await queryCommunities(
            { id: communityId },
            ["include_members", "include_admins", "include_community_goal"]
          );

          // set community goal
          const communityGoal = selected_community[0]?.community_goal?.[0];
          const communityGoalPercentage = communityGoal
            ? parseFloat(
                (communityGoal?.community_total_completed_pages /
                  communityGoal?.community_total_selected_pages) *
                  100
              ).toFixed(2)
            : "0";

          setCurrentCommunity({
            ...currentCommunity,
            goal: `${communityGoalPercentage}%`,
          });

          const members = selected_community[0].members;
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

              // TODO: get endpoint to fetch all admins from community
              // check if member is an admin
              if (
                selected_community[0].community_admins.includes(
                  member.first_name + " " + member.last_name
                )
              ) {
                admins.push(member);
              }
            });
          }
          setCommunityAdmins(admins); // Update the state with the communities admins
          setRows(updatedRows); // Update the state with the new rows
        }
      };
      fetchData();
    },
    [adminStatus]
  );

  function capitalizeWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenRow = async (row) => {
    if (adminStatus === "super") {
      setCurrentCommunity(row);
      setAdminStatus("admin");
    } else {
      // console.log("admin clicked member: ", row);
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
        });
        setPopup(true);
        setPopupStatus("viewMember");
      } catch (e) {
        console.error("Error fetching user data:", e);
        alert("Error fetching user data. Please try again.");
      }
    }
  };

  return (
    <div style={{ marginTop: "2em"}}>
      {isSuperAdmin && adminStatus === "admin" && (
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            marginLeft: "2em",
            position: "relative",
          }}
          onClick={() => {
            setAdminStatus("super");
            setCurrentCommunity([]);
            setCommunityAdmins([]);
          }}
        >
          <ArrowBackIcon />
        </Link>
      )}
      {isSuperAdmin && adminStatus === "super" && (
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
              setPopupStatus("addCommunity");
            }}
          >
            Add Community
          </Button>
        </div>
      )}
      {adminStatus === "admin" && (
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
                    setCommunityData({
                      name: currentCommunity?.name,
                      location: currentCommunity?.location,
                      members: currentCommunity?.members,
                      id: currentCommunity?.id,
                      community_goal: currentCommunity?.goal,
                    });
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
                setUserData({ ...userData, community_id: currentCommunity.id });
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
                {communityAdmins.map((admin, index) => {
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
                })}
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
                <Typography variant="h6">{currentCommunity.name}</Typography>
                <Typography variant="body2">
                  In {currentCommunity.location}
                </Typography>
              </Box>
              <Box
                className="communityGoal"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: { xs: "30dvw", md: "20dvw" }, mr: 1 }}>
                  <Typography variant="subtitle2" sx={{ paddingLeft: "14px" }}>
                    Goal Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(currentCommunity?.goal?.replace("%", ""))}
                    sx={{
                      margin: "10px",
                      marginTop: "0px",
                      height: "20px",
                      backgroundColor: "var(--light-grey)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: "16px",
                        height: "16px",
                        margin: "auto",
                        backgroundColor: "var(--light-blue)",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 35, paddingTop: "12px" }}>
                  <Typography variant="body2" sx={{ color: "black" }}>
                    {currentCommunity?.goal}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1em" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="header">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => {
                        handleOpenRow(row);
                      }}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
          createCommunity={createCommunity}
          rows={rows}
          setRows={setRows}
          setAllCommunities={setAllCommunities}
          allCommunities={allCommunities}
          createSuperData={createSuperData}
          setAdminStatus={setAdminStatus}
          setCommunityAdmins={setCommunityAdmins}
          communityAdmins={communityAdmins}
          setCurrentCommunity={setCurrentCommunity}
          currentCommunity={currentCommunity}
        />
      )}
    </div>
  );
}

export default AdminDash;
