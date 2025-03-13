import { useState, useEffect } from "react";
import { createTractateGoal, updateTractateProgress } from "../utils/API/GoalAPI";
import { Button, DeleteIcon } from "../utils/dataExports/muiExports";

// TODO: update users state when goal is created or updated

function GoalPopup({
  setOpenGoal,
  goalEditOption,
  setGoalEditOption,
  tractates,
  goal,
}) {
  const [selectedTractate, setSelectedTractate] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);

  // Handle change for selecting tractate
  const handleTractateChange = (e) => {
    const selectedGoal = goal.goal_tractates.find(
      (tractate) => tractate.tractate === e.target.value
    );
    setSelectedTractate(selectedGoal);
    setSelectedPage(selectedGoal?.tractate_pages_completed || null); // Reset page selection
  };

  // Handle change for selecting page number
  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
  };

  // Initialize selected tractate and page when goal has exactly one tractate
  useEffect(function initializeSingleTractateGoal() {
    if (goal?.goal_tractates?.length === 1) {
      setSelectedTractate(goal.goal_tractates[0]);
      setSelectedPage(goal.goal_tractates[0].tractate_pages_completed); // Default to completed pages
    }
  }, [goal]);

  const handleTractateCreateChange = (e) => {
    setSelectedTractate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (goalEditOption) {
      case "create-goal":
        if (selectedTractate === "") {
          alert("Please select a tractate");
          return;
        }
        try {
          const response = await createTractateGoal(goal.id, selectedTractate);
          console.log(response);
          // setUser(response);
          alert("Goal created");
          setSelectedTractate("");
          setOpenGoal(false);
        } catch (error) {
          console.error("Error updating user goal:", error);
        }
        console.log("Selected tractate:", selectedTractate);
        setSelectedTractate("");
        setOpenGoal(false);
        break;
      case "update-goal":
        const pageAsFloat = parseFloat(selectedPage);
        try {
          updateTractateProgress(selectedTractate.id, pageAsFloat);
          setSelectedPage(1);
          setOpenGoal(false);
        } catch (error) {
          console.error("Error updating user goal:", error);
        }
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
            <select value={selectedTractate} onChange={handleTractateCreateChange}>
              <option value={""}>Select a tractate</option>
              {tractates.map((tractate) => {
                return (
                  <option key={tractate.id} value={tractate.id}>
                    {tractate.name}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="Submit" />
          </form>
        )}
        {goalEditOption === "update-goal" && (
          <form onSubmit={(e) => handleSubmit(e)}>
            {goal?.goal_tractates?.length > 1 ? (
              // If there are multiple tractates, show a dropdown for selecting tractate and page
              <>
                <label>
                  Select Tractate:
                  <select onChange={handleTractateChange}>
                    <option value="">Select a tractate</option>
                    {goal.goal_tractates.map((tractate) => (
                      <option
                        key={tractate.id}
                        value={tractate.tractate}
                      >
                        {tractate.tractate}
                      </option>
                    ))}
                  </select>
                </label>

                {selectedTractate && (
                  <>
                    <label>
                      Select Page:
                      <select onChange={handlePageChange} value={selectedPage}>
                        <option value="">Select a page</option>
                        {Array.from({ length: selectedTractate.tractate_pages_selected * 2 }, (_, i) => {
                          const pageNumber = Math.floor(i / 2) + 1;
                          const side = i % 2 === 0 ? '.0' : '.5';
                          const sideLabel = i % 2 === 0 ? 'A' : 'B';
                          return (
                            <option key={`${pageNumber}${side}`} value={`${pageNumber}${side}`}>
                              Page {pageNumber} Side {sideLabel}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                  </>
                )}
              </>
            ) : goal?.goal_tractates?.length === 1 ? (
              // If there is only one tractate, show its name and a page dropdown
              <>
                <h3>{goal.goal_tractates[0].tractate}</h3>
                <label>
                  Select Page:
                  <select onChange={handlePageChange} value={selectedPage}>
                    <option value="">Select a page</option>
                    {Array.from({ length: goal.goal_tractates[0].tractate_pages_selected * 2 }, (_, i) => {
                      const pageNumber = Math.floor(i / 2) + 1;
                      const side = i % 2 === 0 ? '.0' : '.5';
                      const sideLabel = i % 2 === 0 ? 'A' : 'B';
                      return (
                        <option key={`${pageNumber}${side}`} value={`${pageNumber}${side}`}>
                          Page {pageNumber} Side {sideLabel}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </>
            ) : (
              // If no tractates exist, show a message
              <p>User has no tractate goals</p>
            )}
            <input type="submit" value="Submit" />
            <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />} onClick={(e) => handleSubmit(e)}>Delete Goal (add dlt req)</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default GoalPopup;
