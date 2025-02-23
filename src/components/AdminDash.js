import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../utils/Context";
import { getCommunity, getAllCommunities } from "../utils/API/CommunityAPI";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// for super, in community have a delete community button and add admin
// ! all edits and deletes should have a confirmation popup
// on super display, have add community button
// when in selected community, make onClick of member a popup with member info and edit option
// make pop reusable? use it for user as well? dk if itll work because user just has settings, no need for popup
// single popup option with different sub options to  display? (add community, add admin, see/edit member)

/* 
super admin:
- create communities
- assign admin to community
- has full CRUD ability for everything

Admin:
- has full CRUD ability for members of the community

filter and search ability
sort by (a-z) name, location, goalComplete
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
  { id: "members", label: "Members", align: "right", minWidth: 170 },
];

function createData(first_name, last_name, population = "", size = "") {
  // function createData(first_name, email, population, size) {
  const goalComplete = population / size;
  return { first_name, last_name, population, goalComplete };
}
function createSuperData(name, location, members) {
  return { name, location, members };
}

// let rows = [];

function AdminDash() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adminStatus, setAdminStatus] = useState("admin");
  const [currentCommunity, setCurrentCommunity] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);
  const [rows, setRows] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [makeAdmin, setMakeAdmin] = useState(false);

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
      if (adminStatus === "super") {
        if (allCommunities.length === 0) {
          // If allCommunities is empty, fetch the communities
          getAllCommunities().then((communities) => {
            setAllCommunities(communities);
            communities.map((community) => {
              updatedRows.push(
                createSuperData(
                  community?.name,
                  community?.location,
                  community?.members?.length
                )
              );
            });
            setRows(updatedRows);
          });
        } else {
          // If allCommunities is already populated, use it directly
          allCommunities.map((community) => {
            updatedRows.push(
              createSuperData(
                community?.name,
                community?.location,
                community?.members?.length
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
        getCommunity("name", communityName, [
          "with_members",
          "with_admins",
        ]).then((community) => {
          community[0]?.members.map((member) => {
            updatedRows.push(createData(member?.first_name, member?.last_name));
          });
          setRows(updatedRows); // Update the state with the new rows
        });
      }
    },
    [adminStatus]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenCommunity = (row) => {
    if (adminStatus === "super") {
      setCurrentCommunity(row);
      setAdminStatus("admin");
    }
  };

  const handleCloseCommunity = () => {
    setAdminStatus("super");
    setCurrentCommunity([]);
  };

  const handleAddCommunity = () => {
    // TODO: pop up of add-community form
    setPopup(true);
    setPopupStatus("addCommunity");
    //   update rows
    //   update DB
    // setRows(...rows, createSuperData("community data"));
  };
  const handleAddCommunityAdmin = () => {
    // TODO: pop up of add-community admin form
    setPopup(true);
    setPopupStatus("addCommunityAdmin");
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
            onClick={() => handleCloseCommunity()}
          >
            {/* onClick should set everything back to super display with all communities */}
            {"< Back"}
          </Link>
          <Link
            style={{ marginLeft: "20px" }}
            onClick={() => handleAddCommunityAdmin()}
          >
            Add Community Admin
          </Link>
        </>
      )}
      {isSuperAdmin && adminStatus === "super" && (
        <Link
          style={{ marginLeft: "20px" }}
          onClick={() => handleAddCommunity()}
        >
          Add Community
        </Link>
      )}
      {isSuperAdmin && (
        <Link
          style={{
            textDecoration: "none",
            color: "blue",
            marginLeft: "20px",
          }}
          onClick={() => setPopup(true) & setPopupStatus("addMember")}
        >
          {/* onClick should set everything back to super display with all communities */}
          {"add user"}
        </Link>
      )}
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
                        handleOpenCommunity(row);
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
              }}
            >
              Close
            </button>
            {popupStatus === "addCommunity" && (
              <form>
                <label>
                  name:
                  <input
                    type="text"
                    placeholder="Community Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  location:
                  <input
                    type="text"
                    placeholder="Community Location"
                    value={""}
                    // onChange={(e) => setLastNameState(e.target.value)}
                  />
                </label>
                <input type="submit" value="Submit" />
              </form>
            )}
            {popupStatus === "createCommunityAdmin" && (
              <form>
                <label>
                  name:
                  <input
                    type="text"
                    placeholder="Last Name"
                    // value={lastNameState}
                    // onChange={(e) => setLastNameState(e.target.value)}
                  />
                </label>
                <label>
                  location:
                  <input
                    type="text"
                    placeholder="Last Name"
                    // value={lastNameState}
                    // onChange={(e) => setLastNameState(e.target.value)}
                  />
                </label>
              </form>
            )}
            {popupStatus === "addCommunityAdmin" && (
              <h2>Add Community Admin</h2>
            )}
            {popupStatus === "editCommunity" && (
              <h2>Edit community name or location</h2>
            )}
            {popupStatus === "editMember" && <h2>Edit Member</h2>}
            {popupStatus === "addMember" && (
              <form>
                <label>
                  name:
                  <input
                    type="text"
                    placeholder="Community Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  location:
                  <input
                    type="text"
                    placeholder="Community Location"
                    value={""}
                    // onChange={(e) => setLastNameState(e.target.value)}
                  />
                </label>
                <label>
                  Make Admin:
                  <input
                    name="makeAdmin"
                    type="checkbox"
                    checked={makeAdmin}
                    onChange={(e) => setMakeAdmin(!makeAdmin)}
                  />
                </label>
                <br />
                <input type="submit" value="Submit" />
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDash;
