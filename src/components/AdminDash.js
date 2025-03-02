import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../utils/Context";
import {
  queryCommunities,
  createCommunity,
  updateCommunity,
} from "../utils/API/CommunityAPI";
import {
  createUser,
  updateUser,
  findUser,
  queryUsers,
} from "../utils/API/UserAPI";

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
  { id: "first_name", label: "First Name", minWidth: 170 },
  { id: "last_name", label: "Last Name", minWidth: 170 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "goalComplete",
    label: "Goal Completed",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const superColumns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 170 },
  // { id: "members", label: "Members", align: "right", minWidth: 170 }
  // issue with portraying members length when upading community
];

function createData(id, first_name, last_name, email, community) {
  return { first_name, last_name, id, email };
}
function createSuperData(id, name, location, members) {
  return { id, name, location, members };
}

function AdminDash() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adminStatus, setAdminStatus] = useState("");
  const [currentCommunity, setCurrentCommunity] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);
  const [rows, setRows] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [communityData, setCommunityData] = useState({
    name: "",
    location: "",
    members: [],
    id: "",
  });
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    community_id: "",
    phone_number: "",
    is_community_admin: false,
  });

  const { isSuperAdmin, user } = useUser();

  const columns = adminStatus === "super" ? superColumns : adminColumns;

  useEffect(function setStatus() {
    if (isSuperAdmin) {
      setAdminStatus("super");
    } else {
      setAdminStatus("admin");
    }
  }, []);

  useEffect(
    function setDataBasedOffStatus() {
      let updatedRows = [];
      const fetchData = async () => {
        if (adminStatus === "super") {
          if (allCommunities.length === 0) {
            // If allCommunities is empty, fetch the communities
            try {
              const communities = await queryCommunities("", "", [
                "with_members",
              ]);
              setAllCommunities(communities);
              communities.map((community) => {
                updatedRows.push(
                  createSuperData(
                    community?.id,
                    community?.name,
                    capitalizeWord(community?.location),
                    community?.members
                  )
                );
              });
              setRows(updatedRows);
              // })
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
                  community?.members
                )
              );
            });
            setRows(updatedRows);
          }
        } else if (adminStatus === "admin") {
          // Fetch a specific community if the adminStatus is admin
          const communityName = isSuperAdmin
            ? currentCommunity?.name
            : user?.community?.name;
          const members = await queryUsers("community_name", communityName);
          if (members?.length > 0) {
            members.map((member) => {
              console.log("member: ", member);
              updatedRows.push(
                createData(
                  member?.id,
                  member?.first_name,
                  member?.last_name,
                  member?.email
                )
              );
            });
          }
          setRows(updatedRows); // Update the state with the new rows
        }
      };
      fetchData();
    },
    [adminStatus]
  );

  function capitalizeWord(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(' ');
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
      console.log("admin clicked community: ", row);
      try {
        const userData = await findUser(row?.id);
        console.log("userData: ", userData);
        setUserData({
          username: userData?.username,
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          email: userData?.email,
          phone_number: userData?.phone_number,
        });
        setPopup(true);
        setPopupStatus("viewMember");
      } catch (e) {
        console.error("Error fetching user data:", e);
        alert("Error fetching user data. Please try again.");
      }
    }
  };

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
      default:
        console.log("Invalid popupStatus");
        break;
    }
  };

  return (
    <>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      {isSuperAdmin && adminStatus === "admin" && (
        <>
          <Link
            style={{
              textDecoration: "none",
              color: "blue",
              marginLeft: "20px",
            }}
            onClick={() => setAdminStatus("super") & setCurrentCommunity([])}
          >
            {"< Back"}
          </Link>
          {/* <Link
            style={{ marginLeft: "20px" }}
            onClick={() => setPopup(true) & setPopupStatus("addCommunityAdmin")}
          >
            Add Community Admin
          </Link> */}
          <Link
            style={{ marginLeft: "20px" }}
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
            Edit Community
          </Link>
          <h4>Community name: {currentCommunity?.name}</h4>
          <h4>Community location: {currentCommunity?.location}</h4>
        </>
      )}
      {isSuperAdmin && adminStatus === "super" && (
        <Link
          style={{ marginLeft: "20px" }}
          onClick={() => setPopup(true) & setPopupStatus("addCommunity")}
        >
          Add Community
        </Link>
      )}
      {/* {isSuperAdmin && (
        <Link
          style={{
            textDecoration: "none",
            color: "blue",
            marginLeft: "20px",
          }}
          onClick={() => setPopup(true) & setPopupStatus("createMember")}
        >
          {"Create New User"}
        </Link>
      )} */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key={"header"}>
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
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      onClick={() => {
                        handleOpenRow(row);
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
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
        <div className="popup-overlay">
          <div className="popup-card">
            <button
              className="close-popup"
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
            >
              Close
            </button>
            {popupStatus === "addCommunity" && (
              <div>
                <form onSubmit={handleSubmit}>
                  <label>
                    name:
                    <input
                      type="text"
                      placeholder="Community Name"
                      value={communityData.name}
                      onChange={(e) =>
                        setCommunityData({
                          ...communityData,
                          name: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    location:
                    <select
                      value={capitalizeWord(communityData.location)}
                      onChange={(e) =>
                        setCommunityData({
                          ...communityData,
                          location: e.target.value,
                        })
                      }
                    >
                      <option value="">Select state</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </div>
            )}
            {popupStatus === "editCommunity" && (
              <div>
                <form onSubmit={handleSubmit}>
                  <label>
                    name:
                    <input
                      type="text"
                      placeholder="Community Name"
                      value={communityData.name}
                      onChange={(e) =>
                        setCommunityData({
                          ...communityData,
                          name: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    location:
                    <select
                      value={capitalizeWord(communityData.location)}
                      onChange={(e) =>
                        setCommunityData({
                          ...communityData,
                          location: e.target.value,
                        })
                      }
                    >
                      <option value="">Select state</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              </div>
            )}
            {popupStatus === "addCommunityAdmin" && (
              <h2>Add Community Admin drop or search for user and community</h2>
            )}
            {popupStatus === "editMember" && (
              //? what info should admin/super be allowed to edit
              <form onSubmit={handleSubmit}>
                <label>
                  name:
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={userData.first_name}
                    onChange={handleUserDataChange}
                  />
                </label>
                <label>
                  last name:
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={userData.last_name}
                    onChange={handleUserDataChange}
                  />
                </label>
                {/* {isSuperAdmin && ( */}
                <label>
                  Make Admin:
                  <input
                    name="is_community_admin"
                    type="checkbox"
                    checked={userData.is_community_admin}
                    value={userData.is_community_admin}
                    onChange={() =>
                      setUserData({
                        ...userData,
                        is_community_admin: !userData.is_community_admin,
                      })
                    }
                  />
                </label>
                {/* )} */}
                <br />
                <input type="submit" value="Submit" />
              </form>
            )}
            {popupStatus === "createMember" && (
              <div>
                <form onSubmit={handleSubmit}>
                  <label>
                    name:
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={userData.first_name}
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
                      value={userData.last_name}
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
                      checked={userData.is_community_admin}
                      value={userData.is_community_admin}
                      onChange={() =>
                        setUserData({
                          ...userData,
                          is_community_admin: !userData.is_community_admin,
                        })
                      }
                    />
                  </label>
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            )}
            {popupStatus === "viewMember" && (
              <div>
                <div>
                  <h3>User Details</h3>
                  <p>
                    Name: {userData.first_name} {userData.last_name}
                  </p>
                  <p>Email: {userData.email}</p>
                  <p> Phone: {userData.phone_number}</p>
                  <p>Admin: {userData.is_community_admin ? "Yes" : "No"}</p>
                </div>
                <button onClick={() => setPopupStatus("editMember")}>
                  Edit user
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDash;
