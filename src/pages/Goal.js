import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoalPopup from "../components/GoalPopup";
import { useUser } from "../utils/context/UserContext";
import { createAnnualGoal, getAllTractates } from "../utils/API/GoalAPI";
import {
  Box,
  LinearProgress,
  Typography,
  ArrowBackIcon,
  Paper,
  MenuItem,
  TextField,
  Card,
  SpeedDialIcon,
  Button,
  AccountCircleRoundedIcon,
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
  const { user, setUser, logout } = useUser();
  const { goal, first_name, last_name } = user;

  const navigate = useNavigate();

  const [selectedTractateData, setSelectedTractateData] = useState({
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

  // const currentYear = new Date().getFullYear();

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

  // const createGoalForCurrentYear = async () => {
  //   try {
  //     await createAnnualGoal(user.id, `${currentYear - 1}-${currentYear}`);
  //     console.log("created new goal for " + currentYear);
  //     setGoalEditOption("create-goal");
  //     setOpenGoal(true);
  //   } catch (e) {
  //     console.error("Error creating goal for current year: ", e);
  //     alert("Error creating goal for current year");
  //   }
  // };

  const handleTractateChange = (event) => {
    const selectedGoal = goal.goal_tractates.find(
      (tractate) => tractate.tractate === event.target.value
    );
    if (selectedGoal) {
      const { tractate, tractate_pages_completed, tractate_pages_selected } =
        selectedGoal;

      const percentageCompleted =
        (tractate_pages_completed / tractate_pages_selected) * 100;

      setSelectedTractateData({
        tractate: tractate,
        percentage_completed: percentageCompleted.toFixed(2),
        pages_completed: tractate_pages_completed,
        pages_selected: tractate_pages_selected,
      });
    } else {
      setSelectedTractateData({
        tractate: "total",
        percentage_completed: goal?.user_percentage_completed || 0,
        pages_completed: goal?.user_total_completed_pages || 0,
        pages_selected: goal?.user_total_selected_pages || 0,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2em",
      }}
    >
      <Box className="profileDisplays" sx={{ display: "flex", gap: "1em" }}>
        <Button
          variant="contained"
          disabled
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "var(--orange)",
              color: "white",
            },
            borderRadius: "13px",
            boxShadow: "none",
            fontSize: "0.7em",
            fontWeight: "300",
            width: "179px",
            height: "35px",
            textTransform: "none",
          }}
        >
          {first_name + " " + last_name}
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "13px",
            boxShadow: "none",
            backgroundColor: "var(--black)",
            fontWeight: "300",
            fontSize: "0.7em",
            width: "179px",
            height: "35px",
            textTransform: "none",
          }}
          onClick={() => navigate("/goal/settings")}
        >
          My Profile
          <AccountCircleRoundedIcon
            sx={{ fontSize: "1rem", marginLeft: ".4em" }}
          />
        </Button>
      </Box>
      <Box
        className="pagesAndTractateDisplays"
        sx={{
          display: "flex",
          gap: "1em",
          alignItems: "stretch",
          marginTop: "20px",
        }}
      >
        <Card
          elevation={0}
          className="tractatesDisplay"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid var(--light-grey)",
            borderRadius: "16px",
            paddingTop: "30px",
            paddingBottom: "10px",
            position: "relative",
            width: "175px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ position: "absolute", top: "10px" }}
          >
            Your Mesechtas:
          </Typography>
          <Box
            sx={{
              marginTop: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {user?.goal?.goal_tractates?.length > 1 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "4px",
                  width: "100%",
                  padding: "0 7px",
                  placeItems: "center",
                }}
              >
                {user.goal.goal_tractates.map((tractate) => (
                  <Typography
                    key={tractate.tractate}
                    variant="caption"
                    sx={{
                      border: "1.5px solid var(--light-grey)",
                      borderRadius: "20px",
                      padding: "3px 7px",
                      textAlign: "center",
                      overflow: "hidden",
                      width: "60px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {tractate.tractate}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography
                variant="caption"
                sx={{
                  border: "1.5px solid var(--light-grey)",
                  borderRadius: "20px",
                  padding: "3px 7px",
                }}
              >
                {user?.goal?.goal_tractates?.[0]?.tractate ||
                  "No tractate selected"}
              </Typography>
            )}
          </Box>
        </Card>
        <Card
          elevation={0}
          className="pagesDisplay"
          sx={{
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid var(--light-grey)",
            borderRadius: "16px",
            paddingTop: "30px",
            paddingBottom: "10px",
            position: "relative",
            width: "175px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ position: "absolute", top: "10px" }}
          >
            Pages completed:
          </Typography>
          <Box
            sx={{
              marginTop: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "var(--light-blue)",
                border: "1.5px solid var(--light-grey)",
                borderRadius: "20px",
                padding: "4px 8px",
              }}
            >
              {selectedTractateData.tractate === "total"
                ? `${goal?.user_total_completed_pages || 0} / ${
                    goal?.user_total_selected_pages || 0
                  }`
                : `${selectedTractateData.pages_completed} / ${selectedTractateData.pages_selected}`}
            </Typography>
          </Box>
        </Card>
      </Box>
      <Paper
        className="progressContainer"
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
        <Typography sx={{ marginTop: ".5em" }}>Your Progress </Typography>
        <Box
          className="progressDisplayContainer"
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "10px",
            width: "90%",
          }}
        >
          <Box className="progressBar" sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={Number(selectedTractateData.percentage_completed)}
              sx={{
                margin: "10px",
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
          <Box className="progressPercentage" sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ color: "var(--black)" }}
            >{`${selectedTractateData.percentage_completed}%`}</Typography>
          </Box>
        </Box>
        <Box
          className="tractateGoalDropdown"
          sx={{
            alignItems: "center",
            marginBottom: "1em",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {user?.goal?.goal_tractates?.length > 1 && (
            <TextField
              select
              autowidth="true"
              value={selectedTractateData.tractate}
              onChange={handleTractateChange}
              id="grouped-select"
              label="View Tractate progress"
              sx={{
                width: "15em",
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
          )}
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: "13px",
            boxShadow: "none",
            backgroundColor: "var(--black)",
            fontWeight: "300",
            fontSize: "0.7em",
            minWidth: "160px",
            height: "32px",
            marginBottom: "2em",
            textTransform: "none",
          }}
          onClick={() => {
            setOpenGoal(true);
            setGoalEditOption("update-goal");
          }}
        >
          Update Progress
          <SpeedDialIcon sx={{ fontSize: "1.2rem", marginLeft: ".2em" }} />
        </Button>
      </Paper>
      <Button
        variant="contained"
        sx={{
          marginTop: "3em",
          borderRadius: "13px",
          boxShadow: "none",
          backgroundColor: "var(--black)",
          fontWeight: "300",
          fontSize: "0.7em",
          minWidth: "160px",
          height: "32px",
          textTransform: "none",
        }}
        onClick={() => {
          setOpenGoal(true);
          setGoalEditOption("create-goal");
        }}
      >
        Select a Mesechta
        <SpeedDialIcon sx={{ fontSize: "1.2rem", marginLeft: ".2em" }} />
      </Button>
      <Button onClick={() => handleLogout()}>Log out</Button>
      {openGoal && (
        <GoalPopup
          setOpenGoal={setOpenGoal}
          goalEditOption={goalEditOption}
          setGoalEditOption={setGoalEditOption}
          tractates={tractates}
          user={user}
          setUser={setUser}
          setSelectedTractateData={setSelectedTractateData}
        />
      )}
    </div>
  );
}

export default Goal;
