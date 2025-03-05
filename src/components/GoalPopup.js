import { useState } from "react";
import { talmudTractates } from "../utils/dataExports/talmudTractates";
function GoalPopup({ setOpenGoal, goalEditOption, setGoalEditOption }) {
  const [selectedTractate, setSelectedTractate] = useState("");
  const handleTractateChange = (e) => {
    setSelectedTractate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (goalEditOption) {
      case "create-goal":
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
        break;
      case "update-goal":
        // updateGoal(user.id, selectedTractate);
        break;
      default:
        console.error("Invalid goal edit option:", goalEditOption);
        return;
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h6
          onClick={() => {
            setOpenGoal(false);
            setGoalEditOption("");
          }}
        >
          X
        </h6>
        {goalEditOption === "create-goal" && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <select value={selectedTractate} onChange={handleTractateChange}>
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
        )}
        {goalEditOption === "update-goal" && (
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* total pages */}
            {/* amount completed */}
            {/* drop down, default amount completed, loop.length = total pages */}
            <input type="submit" value="Submit" />
          </form>
        )}
      </div>
    </div>
  );
}

export default GoalPopup;
