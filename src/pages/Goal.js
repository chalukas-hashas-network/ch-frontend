import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GoalPopup from "../components/GoalPopup";
import { useUser } from "../utils/Context";
import { createGoal, getAllTractates } from "../utils/API/GoalAPI";

/*
TODO: 
get all goals (might be array of all years)
see if theres a goal with goal.year.includes(current.year) (may have to change year check later)
if not, on submit, create new goal then create new goalTractate
or have start goal for {current.year} and onclick create goal and open popup for "create goal"
*/

function Goal() {
  const [openGoal, setOpenGoal] = useState(false);
  const [goalEditOption, setGoalEditOption] = useState("");
  const [tractates, setTractates] = useState([]);
  const { user } = useUser();
  const { goal } = user;

  useEffect(
    function getTractates() {
      const fetchTractates = async () => {
        try {
          const tractates = await getAllTractates();
          setTractates(tractates);
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
      await createGoal(user.id, `${currentYear}-${currentYear + 1}`);
      alert("created new goal for " + currentYear);
      setGoalEditOption("create-goal");
      setOpenGoal(true);
    } catch (e) {
      console.error("Error creating goal for current year:", e);
      alert("Error creating goal for current year");
    }
  };

  return (
    <div>
      <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
        {"< Back"}
      </Link>
      <div className="card" style={{ height: "40px" }}>
        User progress bar
        {/* <div> */}
        {/* if the user has more than one tractate have a dropdown and allow him to select one */}
        <>Tractate name:</>
        <>Total pages complete: {goal?.user_total_completed_pages} / {goal?.user_total_selected_pages}</>
        {/* </div> */}
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
          {/* check goal.goalTractates.length if > 0 then have a dropdown with .tractate.name else just show the first one
           */}
        </div>
      </div>
      {openGoal && (
        <GoalPopup
          setOpenGoal={setOpenGoal}
          goalEditOption={goalEditOption}
          setGoalEditOption={setGoalEditOption}
          tractates={tractates}
          goal={goal}
        />
      )}
    </div>
  );
}

export default Goal;
