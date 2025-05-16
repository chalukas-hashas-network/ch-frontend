import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoalPopup from "../components/GoalPopup";
import { useUser } from "../utils/context/UserContext";
import { createAnnualGoal } from "../utils/API/GoalAPI";
import { useTractate } from "../utils/context/TractateContext";
import {
  Box,
  Typography,
  Paper,
  MenuItem,
  TextField,
  Card,
  SpeedDialIcon,
  Button,
  AccountCircleRoundedIcon,
  KeyboardArrowDownRoundedIcon,
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
  const { user, setUser, logout } = useUser();
  const { goal, first_name, last_name } = user;

  const {allTractates, getAllTractateData} = useTractate();
  const navigate = useNavigate();

  const [selectedTractateData, setSelectedTractateData] = useState({
    tractate: "total",
    percentage_completed: goal.user_percentage_completed || 0,
    pages_completed: goal.user_total_completed_pages || 0,
    pages_selected: goal.user_total_selected_pages || 0,
  });

  useEffect(
    function getTractates() {
      if (goalEditOption === "create-goal") {
        getAllTractateData();
      }
    },
    [goalEditOption, getAllTractateData]
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
    <Box
      sx={{
        paddingTop: "2em",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        className="profileDisplays"
        sx={{
          display: "flex",
          gap: "1em",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          disabled
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "var(--orange)",
              color: "white",
            },
            borderRadius: "15px",
            boxShadow: "none",
            fontSize: "0.7em",
            height: "2.5rem",
            width: "11rem",
            textTransform: "none",
          }}
        >
          {first_name + " " + last_name}
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "15px",
            boxShadow: "none",
            backgroundColor: "var(--black)",
            fontSize: "0.7em",
            height: "2.5rem",
            width: "11rem",
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
          justifyContent: "center",
          gap: "1em",
          alignItems: "stretch",
          marginTop: "20px",
          width: "100%",
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
            borderRadius: "15px",
            paddingTop: "2em",
            paddingBottom: "1em",
            position: "relative",
            width: "11rem",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ position: "absolute", top: "10px", fontSize: ".9em" }}
          >
            Your Mesechtas
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
                  gap: ".4em",
                  width: "95%",
                  // padding: "0 7px",
                  // placeItems: "center",
                }}
              >
                {user.goal.goal_tractates.map((tractate) => (
                  <Typography
                    key={tractate.tractate}
                    variant="caption"
                    sx={{
                      border: "1.5px solid var(--light-grey)",
                      borderRadius: "20px",
                      textAlign: "center",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: ".2rem .2rem",
                      minWidth: "6em",
                      maxWidth: "8em",
                      height: "2.2em",
                      fontSize: ".6em",
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
                  textAlign: "center",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: ".2rem .2rem",
                  minWidth: "6em",
                  maxWidth: "8em",
                  height: "2.2em",
                  fontSize: ".6em",
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
            borderRadius: "15px",
            paddingTop: "2em",
            paddingBottom: "1em",
            position: "relative",
            width: "11rem",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ position: "absolute", top: "10px", fontSize: ".9em" }}
          >
            Pages completed
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
                padding: ".2em 3.5em",
                fontSize: ".65em",
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
          width: "95%",
          maxWidth: "23rem",
          marginTop: "20px",
        }}
      >
        <Typography sx={{ marginTop: "1em" }}>Your Progress Bar</Typography>
        <Box
          className="progressDisplayContainer"
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1em",
            width: "90%",
            justifyContent: "center",
          }}
        >
          <Box
            className="progressBar"
            sx={{
              width: "90%",
              bgcolor: "var(--light-grey)",
              borderRadius: "20px",
              height: "2em",
              display: "flex",
              alignItems: "center",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                height: "1.3em",
                width: `${Number(selectedTractateData.percentage_completed)}%`,
                bgcolor: "var(--light-blue)",
                borderRadius: "20px",
                marginLeft: "15px",
              }}
            />
            <Box
              sx={{
                left: `${Number(selectedTractateData.percentage_completed)}%`,
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
                {`${selectedTractateData.percentage_completed}%`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="tractateGoalDropdown"
          sx={{
            alignItems: "center",
            marginBottom: ".5em",
            marginTop: ".8em",
            display: "flex",
            justifyContent: "center",
            width: "17.5em",
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
                "& .MuiInputBase-root": {
                  height: "3em",
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
          )}
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: "13px",
            boxShadow: "none",
            backgroundColor: "var(--black)",
            fontWeight: "300",
            fontSize: "0.8em",
            width: "20em",
            height: "3em",
            marginBottom: ".5em",
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
        <Typography
          sx={{ fontSize: ".7em", marginBottom: "2em", width: "23em" }}
        >
          *Updating your progress helps the community and yourself track where
          you're holding.
        </Typography>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginTop: "1em",
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "13px",
            boxShadow: "none",
            backgroundColor: "white",
            color: "var(--black)",
            fontWeight: "300",
            fontSize: "0.8em",
            width: "95%",
            maxWidth: "23rem",
            height: "3em",
            textTransform: "none",
            justifyContent: "space-between",
          }}
          onClick={() => {
            setOpenGoal(true);
            setGoalEditOption("create-goal");
          }}
        >
          Select {user?.goal?.goal_tractates?.length > 0 ? "another" : "a"}{" "}
          Mesechta
          <KeyboardArrowDownRoundedIcon
            sx={{ fontSize: "2rem", marginLeft: ".2em" }}
          />
        </Button>
        <Button
          variant="contained"
          sx={{
            marginTop: "1em",
            borderRadius: "13px",
            boxShadow: "none",
            backgroundColor: "var(--black)",
            fontWeight: "300",
            fontSize: "0.8em",
            width: "95%",
            maxWidth: "23rem",
            height: "3em",
            textTransform: "none",
          }}
          onClick={() => navigate("/goal/settings")}
        >
          My Profile Settings
        </Button>
      </Box>
      <Button onClick={() => handleLogout()}>Log out</Button>
      {openGoal && (
        <GoalPopup
          setOpenGoal={setOpenGoal}
          goalEditOption={goalEditOption}
          setGoalEditOption={setGoalEditOption}
          tractates={allTractates}
          user={user}
          setUser={setUser}
          setSelectedTractateData={setSelectedTractateData}
        />
      )}
    </Box>
  );
}

export default Goal;
