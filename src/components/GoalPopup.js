import { useState, useEffect } from "react";

function GoalPopup({
  setOpenGoal,
  goalEditOption,
  setGoalEditOption,
  tractates,
  goal,
}) {
  const [selectedTractate, setSelectedTractate] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);

  // Handle change for selecting tractate
  const handleTractateChange = (e) => {
    const selectedGoal = goal.goal_tractates.find(
      (tractate) => tractate.tractate_name === e.target.value
    );
    setSelectedTractate(selectedGoal);
    setSelectedPage(selectedGoal?.tractate_pages_completed || null); // Reset page selection
  };

  // Handle change for selecting page number
  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
  };

  // Set the initial selected tractate if it is available
  useEffect(() => {
    if (goal?.goal_tractates?.length === 1) {
      setSelectedTractate(goal.goal_tractates[0]);
      setSelectedPage(goal.goal_tractates[0].tractate_pages_completed); // Default to completed pages
    }
  }, [goal]);

  // const handleTractateChange = (e) => {
  //   setSelectedTractate(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (goalEditOption) {
      case "create-goal":
        if (selectedTractate === "") {
          alert("Please select a tractate");
          return;
        }
        try {
          // const response = await updateTractateGoal();
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
            {/* //! need to update this where pages have A and B sides */}
            {goal?.goal_tractates?.length > 1 ? (
              // If there are multiple tractates, show a dropdown for selecting tractate and page
              <>
                <label>
                  Select Tractate:
                  <select onChange={handleTractateChange}>
                    <option value="">Select a tractate</option>
                    {goal.goal_tractates.map((tractate) => (
                      <option
                        key={tractate.tractate_name}
                        value={tractate.tractate_name}
                      >
                        {tractate.tractate_name}
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
                        {[
                          ...Array(
                            selectedTractate.tractate_pages_selected
                          ).keys(),
                        ].map((page) => (
                          <option key={page + 1} value={page + 1}>
                            Page {page + 1}
                          </option>
                        ))}
                      </select>
                    </label>
                  </>
                )}
              </>
            ) : goal?.goal_tractates?.length === 1 ? (
              // If there is exactly one tractate, show its name and a page dropdown
              <>
                <h3>{goal.goal_tractates[0].tractate_name}</h3>
                <label>
                  Select Page:
                  <select onChange={handlePageChange} value={selectedPage}>
                    <option value="">Select a page</option>
                    {[
                      ...Array(
                        goal.goal_tractates[0].tractate_pages_selected
                      ).keys(),
                    ].map((page) => (
                      <option key={page + 1} value={page + 1}>
                        Page {page + 1}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            ) : (
              // If no tractates exist, show a message
              <p>User has no tractate goals</p>
            )}
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
