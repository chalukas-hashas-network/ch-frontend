import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GoalPopup from "../components/GoalPopup";
import { useUser } from "../utils/Context";
import { createAnnualGoal, getAllTractates } from "../utils/API/GoalAPI";
import { Box, LinearProgress, Typography } from "../utils/dataExports/muiExports";

/*
TODO: 
get all goals (might be array of all years)
see if theres a goal with goal.year.includes(current.year) (may have to change year check later)
if not, on submit, create new goal then create new goalTractate
or have start goal for {current.year} and onclick create goal and open popup for "create goal"
TODO: build out progress bar, allow for user to delete goal, finish year logic, update user state upon any edits, close popup on submit, fix page dropdown after submit (goes to default)
*/

function Goal() {
  const [openGoal, setOpenGoal] = useState(false);
  const [goalEditOption, setGoalEditOption] = useState("");
  const [tractates, setTractates] = useState([]);
  const [selectedTractate, setSelectedTractate] = useState({
    tractate: "total",
    pages_completed: 0,
    pages_selected: 0,
  });
  const { user, setUser } = useUser();
  const { goal } = user;

  useEffect(
    function getTractates() {
      const fetchTractates = async () => {
        try {
          const tractates = await getAllTractates();
          setTractates(tractates);
          console.log("tractates", tractates);
        } catch (e) {
          console.error("Error fetching tractates:", e);
        }
      };
      if (goalEditOption === "create-goal") {
        fetchTractates();
      }
    },
    [goalEditOption]
  );

  const currentYear = new Date().getFullYear();

  const jewishYear = currentYear + 3760; // Get the jewish year
  const [selectedYear, setSelectedYear] = useState(jewishYear);
  // Create an array of years from the current Jewish year down to 5783
  const years = [];
  // ! change year to start from 5785
  for (let year = jewishYear; year >= 5783; year--) {
    years.push(year);
  }
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const createGoalForCurrentYear = async () => {
    try {
      await createAnnualGoal(user.id, `${currentYear}-${currentYear + 1}`);
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
      setSelectedTractate({
        tractate: selectedGoal.tractate,
        pages_completed: selectedGoal.tractate_pages_completed,
        pages_selected: selectedGoal.tractate_pages_selected,
      });
    } else {
      setSelectedTractate({
        tractate: "total",
        pages_completed: goal?.user_total_completed_pages,
        pages_selected: goal?.user_total_selected_pages,
      });
    }
  };

  return (
    <div>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      <div className="card" style={{ height: "150px" }}>
        <>User Progress Bar </>
        <Box sx={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={goal.user_percentage_completed}
              style={{ margin: "10px", height: "20px" }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${goal.user_percentage_completed}%`}</Typography>
          </Box>
        </Box>
        {user?.goal?.goal_tractates?.length > 1 ? (
          <div>
            <select
              style={{ marginLeft: "10px" }}
              onChange={handleTractateChange}
            >
              <option value="total">Total</option>
              {user.goal.goal_tractates.map((tractate) => (
                <option key={tractate.id} value={tractate.tractate}>
                  {tractate.tractate}
                </option>
              ))}
            </select>
            <br />
            Pages completed:{" "}
            {selectedTractate?.tractate === "total"
              ? goal?.user_total_completed_pages
              : selectedTractate.pages_completed}{" "}
            /{" "}
            {selectedTractate?.tractate === "total"
              ? goal?.user_total_selected_pages
              : selectedTractate.pages_selected}
          </div>
        ) : (
          <div>
            <span style={{ marginLeft: "10px" }}>
              {user?.goal?.goal_tractates?.[0]?.tractate ||
                "No tractate selected"}
            </span>
            <br />
            Pages complete: {goal?.user_total_completed_pages} /{" "}
            {goal?.user_total_selected_pages}
          </div>
        )}
        <select
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
        </select>
      </div>
      <div>
        {goal.year.includes(currentYear) ? (
          <div
            className="card"
            onClick={() => {
              setOpenGoal(true);
              setGoalEditOption("create-goal");
            }}
          >
            create goal
          </div>
        ) : (
          <div className="card" onClick={() => createGoalForCurrentYear()}>
            create goal
          </div>
        )}
        <div
          className="card"
          onClick={() => {
            setOpenGoal(true);
            setGoalEditOption("update-goal");
          }}
        >
          update goal
        </div>
      </div>
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
  );
}

export default Goal;
