import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GoalPopup from "../components/GoalPopup";
import { useUser } from "../utils/Context";
import { createAnnualGoal, getAllTractates } from "../utils/API/GoalAPI";
import {
  Box,
  LinearProgress,
  Typography,
  ArrowBackIcon,
  Paper,
  MenuItem,
  TextField,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  NoteAddIcon,
  UpgradeIcon,
} from "../utils/dataExports/muiExports";

/*
TODO: 
see if theres a goal with goal.year.includes(current.year) (may have to change year check later)
if not, on submit, create new goal then create new goalTractate
or have start goal for {current.year} and onclick create goal and open popup for "create goal"
TODO: allow for user to delete goal, finish year logic, update user state upon any edits, fix page dropdown after submit (goes to default)
TODO: if goal is empty, show "no goal"
*/

function Goal() {
  const [openGoal, setOpenGoal] = useState(false);
  const [goalEditOption, setGoalEditOption] = useState("");
  const [tractates, setTractates] = useState([]);
  const { user, setUser } = useUser();
  const { goal } = user;

  const [selectedTractate, setSelectedTractate] = useState({
    tractate: "total",
    percentage_completed: goal.user_percentage_completed || 0,
    pages_completed: goal.user_total_completed_pages || 0,
    pages_selected: goal.user_total_selected_pages || 0,
  });

  useEffect(
    function getTractates() {
      const fetchTractates = async () => {
        try {
          const allTractates = await getAllTractates();
          setTractates(allTractates);
        } catch (e) {
          console.error("Error fetching tractates:", e);
        }
      };
      if (goalEditOption === "create-goal" && tractates.length === 0) {
        fetchTractates();
      }
    },
    [goalEditOption]
  );

  const currentYear = new Date().getFullYear();

  // const jewishYear = currentYear + 3760; // Get the jewish year
  // const [selectedYear, setSelectedYear] = useState(jewishYear);
  // // Create an array of years from the current Jewish year down to 5783
  // const years = [];
  // // ! change year to start from 5785
  // for (let year = jewishYear; year >= 5783; year--) {
  //   years.push(year);
  // }

  // const handleYearChange = (event) => {
  //   setSelectedYear(event.target.value);
  // };

  const createGoalForCurrentYear = async () => {
    try {
      await createAnnualGoal(user.id, `${currentYear - 1}-${currentYear}`);
      alert("created new goal for " + currentYear);
      setGoalEditOption("create-goal");
      setOpenGoal(true);
    } catch (e) {
      console.error("Error creating goal for current year: ", e);
      alert("Error creating goal for current year");
    }
  };

  const handleTractateChange = (event) => {
    const selectedGoal = goal.goal_tractates.find(
      (tractate) => tractate.tractate === event.target.value
    );
    if (selectedGoal) {
      const { tractate, tractate_pages_completed, tractate_pages_selected } =
        selectedGoal;

      const percentageCompleted =
        (tractate_pages_completed / tractate_pages_selected) * 100;

      setSelectedTractate({
        tractate: tractate,
        percentage_completed: percentageCompleted.toFixed(2),
        pages_completed: tractate_pages_completed,
        pages_selected: tractate_pages_selected,
      });
    } else {
      setSelectedTractate({
        tractate: "total",
        percentage_completed: goal?.user_percentage_completed || 0,
        pages_completed: goal?.user_total_completed_pages || 0,
        pages_selected: goal?.user_total_selected_pages || 0,
      });
    }
  };

  return (
    <div style={{ color: "black", paddingTop: "100px" }}>
      <Link
        style={{ textDecoration: "none", color: "black", marginLeft: "2em" }}
        to="/home"
      >
        <ArrowBackIcon />
      </Link>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            border: "2px solid var(--light-grey)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            marginTop: "20px",
          }}
        >
          <Typography sx={{ marginTop: ".5em" }}>User Progress Bar </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
              width: "90%",
            }}
          >
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={selectedTractate.percentage_completed}
                sx={{
                  margin: "10px",
                  height: "20px",
                  backgroundColor: "var(--orange-light)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "var(--orange)",
                  },
                }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ color: "black" }}
              >{`${selectedTractate.percentage_completed}%`}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              marginBottom: "1em",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {user?.goal?.goal_tractates?.length > 1 ? (
              <>
                <TextField
                  select
                  autowidth="true"
                  value={selectedTractate.tractate}
                  onChange={handleTractateChange}
                  id="grouped-select"
                  label="Tractate"
                  sx={{
                    marginRight: "1em",
                    width: "15em",
                    "& .MuiOutlinedInput-root": {
                      color: "black",
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
                  }}
                >
                  <MenuItem key="total" value="total">
                    <em>Total</em>
                  </MenuItem>
                  {user.goal.goal_tractates.map((tractate) => (
                    <MenuItem key={tractate.id} value={tractate.tractate}>
                      {tractate.tractate}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <Typography>
                  Pages completed: {selectedTractate.pages_completed} /{" "}
                  {selectedTractate.pages_selected}
                  {/* {selectedTractate?.tractate === "total"
                    ? goal?.user_total_completed_pages
                    : selectedTractate.pages_completed}{" "}
                  /{" "}
                  {selectedTractate?.tractate === "total"
                    ? goal?.user_total_selected_pages
                    : selectedTractate.pages_selected} */}
                </Typography>
              </>
            ) : (
              <>
                <Typography style={{ marginLeft: "10px" }}>
                  {user?.goal?.goal_tractates?.[0]?.tractate ||
                    "No tractate selected"}
                </Typography>
                <br />
                <Typography>
                  Pages completed: {goal?.user_total_completed_pages} /{" "}
                  {goal?.user_total_selected_pages}
                </Typography>
              </>
            )}
          </Box>
          {/* <select
          style={{ position: "absolute", right: "20px", margin: "10px" }}
          id="yearDropdown"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select> */}
        </Paper>
        <Box
          className="speedDialForMobile"
          sx={{
            height: 320,
            transform: "translateZ(0px)",
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            position: "relative",
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              position: "absolute",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              "&.MuiSpeedDial-root": {
                "& .MuiSpeedDial-fab": {
                  backgroundColor: "var(--orange)",
                  color: "white",
                },
              },
            }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              key={"update"}
              icon={<UpgradeIcon />}
              onClick={() => {
                setOpenGoal(true);
                setGoalEditOption("update-goal");
              }}
              slotProps={{
                tooltip: {
                  title: "Update",
                  open: true,
                },
              }}
            />
            {goal?.year?.includes(currentYear) ? (
              <SpeedDialAction
                key={"create"}
                icon={<NoteAddIcon />}
                onClick={() => {
                  setOpenGoal(true);
                  setGoalEditOption("create-goal");
                }}
                slotProps={{
                  tooltip: {
                    title: "Create",
                    open: true,
                  },
                }}
              />
            ) : (
              <SpeedDialAction
                key={"create"}
                icon={<NoteAddIcon />}
                onClick={() => createGoalForCurrentYear()}
                slotProps={{
                  tooltip: {
                    title: "Create",
                    open: true,
                  },
                }}
              />
            )}
          </SpeedDial>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flow" },
            width: { xs: "50%", md: "25%" },
            height: "300px",
            marginTop: "2em",
          }}
        >
          {goal?.year?.includes(currentYear) ? (
            <div
              className="card"
              style={{ height: "3em" }}
              onClick={() => {
                setOpenGoal(true);
                setGoalEditOption("create-goal");
              }}
            >
              <Typography>create goal</Typography>
            </div>
          ) : (
            <div
              className="card"
              style={{ height: "3em" }}
              onClick={() => createGoalForCurrentYear()}
            >
              <Typography>create goal</Typography>
            </div>
          )}
          <div
            className="card"
            style={{ height: "3em", marginTop: "1em" }}
            onClick={() => {
              setOpenGoal(true);
              setGoalEditOption("update-goal");
            }}
          >
            <Typography>update goal</Typography>
          </div>
        </Box>
        {openGoal && (
          <GoalPopup
            setOpenGoal={setOpenGoal}
            goalEditOption={goalEditOption}
            setGoalEditOption={setGoalEditOption}
            tractates={tractates}
            goal={goal}
            setUser={setUser}
          />
        )}
      </div>
    </div>
  );
}

export default Goal;
