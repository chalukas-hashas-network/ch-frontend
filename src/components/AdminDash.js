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

// for super, get community name and id, onclick of community, get all users in that community
// if admin, get just community
// when super clicks on community, display admin settings for that community
// when super clicks back, set settings back to super display
// for super, in community have a delete community button and add admin
// ! all edits and deletes should have a confirmation popup
// on super display, have add community button


// TODO: for super, just show community, onclick to change table to community
// for admin show name, email, phone, goalComplete
// ? have dropdown instead and showcase users details there?
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
  { id: "name", label: "Name", minWidth: 170 },
  // { id: "email", label: "Email", minWidth: 170 },
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


function createData(name, email, population, size) {
  const goalComplete = population / size;
  return { name, email, population, size, goalComplete };
}
function createSuperData(name, location, size) {
  return { name, location, size };
}

const rows = [];

function AdminDash() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adminStatus, setAdminStatus] = useState("");
  const [currentCommunity, setCurrentCommunity] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);

  const { isSuperAdmin, user } = useUser();
  //   0:
  // community_admins: (2) ['levi deutsch', 'benny sufrin']
  // location: "Brooklyn, NY"
  // members: null
  // name: "crown heights"
  const columns = isSuperAdmin ? superColumns : adminColumns;

  console.log("admin status: ", adminStatus);

  useEffect(() => {
    if (isSuperAdmin) {
      console.log("Super Admin");
      setAdminStatus("super");
      getAllCommunities().then((communities) => {
        // ? is allCommunities needed if i just map directly?
        setAllCommunities(communities);
        communities.map((community) => {
          rows.push(createSuperData(
            community?.name,
            community?.location,
            community?.members?.length
          ));
        });
      });
    } else {
      console.log("Admin");
      setAdminStatus("admin");
      getCommunity(user?.community?.name);
      // should be ID instead of name
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenCommunity = (row) => {
    if(adminStatus === "super") {
      console.log("row: ", row);
      setCurrentCommunity(row);
      setAdminStatus("admin");
    }
    // TODO: make fetch for community, set return to currentCommunity
  }

  return (
    <>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      {isSuperAdmin && 
        <Link style={{ textDecoration: "none", color: "blue" }} onClick={() => setAdminStatus("super")}>
          {/* onClick should set everything back to super display with all communities */}
          {"< Back"}
        </Link>
      }
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
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
                      onClick={() => {handleOpenCommunity(row)}}
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
    </>
  );
}

export default AdminDash;
