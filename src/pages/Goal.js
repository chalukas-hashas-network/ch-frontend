import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../utils/Context";
import { talmudTractates } from "../utils/dataExports/talmudTractates";

function Goal() {
  const [openGoal, setOpenGoal] = useState(false);
  const [selectedTractate, setSelectedTractate] = useState("");

  const { user } = useUser();

  const handleTractateChange = (e) => {
    setSelectedTractate(e.target.value);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (selectedTractate === "") {
      alert("Please select a tractate");
      return;
    }
    try {
      // const response = await updateUser({goal: selectedTractate});
      // console.log(response);
      // setUser(response);
      // setSelectedTractate("");
      // setOpenGoal(false);
    } catch (error) {
      console.error("Error updating user goal:", error);
    }
    console.log("Selected tractate:", selectedTractate);
    setSelectedTractate("");
    setOpenGoal(false);
  };
  return (
    <>
      <div>
        <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
          {"< Back"}
        </Link>
        <div className="card" style={{height: "40px"}}>
          User progress bar
          {/* <div> */}
          {/* if the user has more than one tractate have a dropdown and allow him to select one */}
          <>Tractate name:</>
          <>Pages complete / pages total</>
          {/* </div> */}
          <select
            style={{ position: "absolute", right: "20px", margin: "10px"}}
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
        {openGoal && (
          <div className="popup-overlay">
            <div className="popup-card">
              <h6 onClick={() => setOpenGoal(false)}>X</h6>
              <form onSubmit={(e) => handleSubmit(e)}>
                <select
                  value={selectedTractate}
                  onChange={handleTractateChange}
                >
                  <option value={""}>Select a tractate</option>
                  {Object.entries(talmudTractates).map(([order, tractates]) => (
                    <optgroup key={order} label={order}>
                      {tractates.map((tractate) => (
                        <option key={tractate.id} value={tractate.name}>
                          {/* <option key={tractate.id} value={tractate.id}> */}
                          {tractate.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Goal;
