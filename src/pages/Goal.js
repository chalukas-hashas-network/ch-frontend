import { Link } from "react-router-dom";
import { useState } from "react";
import GoalPopup from "../components/GoalPopup";

function Goal() {
  const [openGoal, setOpenGoal] = useState(false);

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

  return (
    <>
      <div>
        <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
          {"< Back"}
        </Link>
        <div className="card" style={{ height: "40px" }}>
          User progress bar
          {/* <div> */}
          {/* if the user has more than one tractate have a dropdown and allow him to select one */}
          <>Tractate name:</>
          <>Pages complete / pages total</>
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
          <div className="card" onClick={(e) => setOpenGoal(true)}>
            select goal
          </div>
          <div className="card" onClick={(e) => setOpenGoal(true)}>
            update goal
          </div>
        </div>
        {openGoal && <GoalPopup setOpenGoal={setOpenGoal} />}
      </div>
    </>
  );
}

export default Goal;
