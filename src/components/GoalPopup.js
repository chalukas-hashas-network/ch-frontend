import { useState, useEffect } from "react";
import {
  createTractateGoal,
  updateTractateProgress,
  createAnnualGoal,
  deleteTractateGoal,
} from "../utils/API/GoalAPI";
import {
  Button,
  CloseRoundedIcon,
  DeleteIcon,
  Dialog,
  MenuItem,
  TextField,
  Typography,
  Card,
} from "../utils/dataExports/muiExports";

// TODO: update users state when goal is created
// ? why cant user update page to be 0?

function GoalPopup({
  setOpenGoal,
  goalEditOption,
  setGoalEditOption,
  tractates,
  // goal,
  setUser,
  user,
  setSelectedTractateData,
}) {
  const { goal } = user;

  const [selectedPage, setSelectedPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTractate, setSelectedTractate] = useState({
    id: "",
    tractate: "",
  });

  const resetData = () => {
    setErrorMessage("");
    setSelectedTractate({ id: "", tractate: "" });
    setSelectedPage(0);
    setOpenGoal(false);
    setGoalEditOption("");
  };

  const currentYear = new Date().getFullYear();

  // Handle change for selecting tractate
  const handleTractateChange = (e) => {
    setErrorMessage("");
    const selectedGoal = goal.goal_tractates.find(
      (tractate) => tractate.id === e.target.value
    );
    setSelectedTractate(selectedGoal || { id: "", tractate: "" });
    setSelectedPage(selectedGoal?.tractate_pages_completed || 0); // Reset page selection
  };

  // Handle change for selecting page number
  const handlePageChange = (e) => {
    setSelectedPage(e.target.value);
  };

  // Initialize selected tractate and page when goal has exactly one tractate
  useEffect(
    function initializeSingleTractateGoal() {
      if (
        goal?.goal_tractates?.length === 1 &&
        goalEditOption === "update-goal"
      ) {
        setSelectedTractate(goal.goal_tractates[0]);
        setSelectedPage(goal.goal_tractates[0].tractate_pages_completed || 0); // Default to completed pages
      }
    },
    [goal]
  );

  const handleTractateCreateChange = (e) => {
    setErrorMessage("");
    const selectedTractate = tractates.find(
      (tractate) => tractate.id === e.target.value
    );
    setSelectedTractate(selectedTractate || { id: "", tractate: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrorMessage("");
    switch (goalEditOption) {
      case "create-goal":
        if (selectedTractate.id === "") {
          setErrorMessage("Please select a tractate");
          return;
        }
        try {
          debugger
          // TODO: response should return updated goal, not just new goal.goal_tractate

          if (!goal?.year?.includes(currentYear)) {
            // ! get newGoal id to use in creating tractate goal
            const newGoal = await createAnnualGoal(
              user.id,
              `${currentYear - 1}-${currentYear}`
            );
            // setUser(user.goal = {id: newGoal.id})
            console.log("created new goal for " + currentYear);
          }

          // ! wont work if user is creating goal for first time
          await createTractateGoal(goal.id, selectedTractate.id);

          const totalSelected =
            goal?.user_total_selected_pages + selectedTractate.number_of_pages;

          const percentageCompleted = parseFloat(
            (goal.user_total_completed_pages / totalSelected) * 100
          ).toFixed(2);
          const newGoal = {
            tractate: selectedTractate.name,
            tractate_pages_completed: 0,
            tractate_pages_selected: selectedTractate.number_of_pages,
          };

          setUser({
            ...user,
            goal: {
              ...goal,
              user_total_selected_pages: totalSelected,
              user_percentage_completed: percentageCompleted,
              goal_tractates: [...goal.goal_tractates, newGoal],
            },
          });
          alert("Goal created");
          resetData();
        } catch (error) {
          console.error("Error updating user goal:", error);
        }
        resetData();
        break;
      case "update-goal":
        if (selectedTractate.id === "") {
          setErrorMessage("Please select a tractate");
          return;
        }
        const pageAsFloat = parseFloat(selectedPage);
        try {
          // ! cant make the page 0
          await updateTractateProgress(selectedTractate.id, pageAsFloat);

          let newPercentageCompleted = 0;
          let newTotalCompletedPages = 0;

          setUser((prevUser) => {
            // Create a copy of the goal tractates array
            const updatedGoalTractates = [...prevUser.goal.goal_tractates];

            // Find the index of the tractate that needs updating
            const tractateIndex = updatedGoalTractates.findIndex(
              (tractate) => tractate.id === selectedTractate.id
            );

            if (tractateIndex === -1) return prevUser; // Tractate not found

            const updatedTractate = { ...updatedGoalTractates[tractateIndex] };

            // Calculate new total completed pages
            newTotalCompletedPages = prevUser.goal.user_total_completed_pages;

            // If user decreased their progress, subtract the difference from total
            if (updatedTractate.tractate_pages_completed > pageAsFloat) {
              newTotalCompletedPages -=
                updatedTractate.tractate_pages_completed - pageAsFloat;
              // If user increased their progress, add the difference to total
            } else if (updatedTractate.tractate_pages_completed < pageAsFloat) {
              newTotalCompletedPages +=
                pageAsFloat - updatedTractate.tractate_pages_completed;
            }

            // Update the specific tractate's completed pages
            updatedTractate.tractate_pages_completed = pageAsFloat;
            updatedGoalTractates[tractateIndex] = updatedTractate;

            // Calculate new percentage completed
            newPercentageCompleted = Number(
              (
                (newTotalCompletedPages /
                  prevUser.goal.user_total_selected_pages) *
                100
              ).toFixed(2)
            );

            // Return updated user object with new goal data
            return {
              ...prevUser,
              goal: {
                ...prevUser.goal,
                goal_tractates: updatedGoalTractates,
                user_total_completed_pages: newTotalCompletedPages,
                user_percentage_completed: newPercentageCompleted,
              },
            };
          });

          setSelectedTractateData({
            ...selectedTractate,
            tractate: "total",
            percentage_completed: newPercentageCompleted,
            pages_completed: newTotalCompletedPages,
          });

          resetData();
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
    <Dialog
      open={true}
      onClose={() => resetData()}
      PaperComponent={Card}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "15px",
          },
        },
      }}
      sx={{ backdropFilter: "blur(5px)" }}
    >
      <div className="popup-card">
        <Button
          onClick={() => resetData()}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseRoundedIcon style={{ color: "var(--orange)" }} />
        </Button>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "2em",
            height: "90%",
          }}
        >
          {goalEditOption === "create-goal" && (
            <div>
              <TextField
                error={errorMessage !== ""}
                helperText={errorMessage}
                select
                label="Select Tractate"
                value={selectedTractate.id || ""}
                onChange={handleTractateCreateChange}
              >
                <MenuItem disabled key="default" value="">
                  <em>Select a tractate</em>
                </MenuItem>
                {tractates.map((tractate) => {
                  return (
                    <MenuItem key={tractate.id} value={tractate.id}>
                      {tractate.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>
          )}
          {goalEditOption === "update-goal" && (
            <div>
              {goal?.goal_tractates?.length > 1 ? (
                // If there are multiple tractates, show a dropdown for selecting tractate and page
                <div className="selectTractateDropdown">
                  <TextField
                    error={errorMessage !== ""}
                    helperText={errorMessage}
                    select
                    label="Select Tractate"
                    value={selectedTractate.id || ""}
                    onChange={handleTractateChange}
                  >
                    <MenuItem disabled key="default" value="">
                      <em>Select a tractate</em>
                    </MenuItem>
                    {goal?.goal_tractates.map((tractate) => {
                      return (
                        <MenuItem key={tractate.id} value={tractate.id}>
                          {tractate.tractate}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  {selectedTractate.id !== "" && (
                    <div
                      className="pageSelectDropdown"
                      style={{ marginTop: "2em" }}
                    >
                      <TextField
                        select
                        label="Select Page"
                        value={selectedPage}
                        onChange={handlePageChange}
                      >
                        <MenuItem disabled value="">
                          <em>Select a page</em>
                        </MenuItem>
                        {Array.from(
                          { length: selectedTractate?.tractate_pages_selected },
                          (_, i) => {
                            const pageNumber = Math.floor(i / 2) + 2;
                            const side = i % 2 === 0 ? "A" : "B";
                            return (
                              <MenuItem key={i} value={i}>
                                Page {pageNumber} Side {side}
                              </MenuItem>
                            );
                          }
                        )}
                        <MenuItem
                          key={selectedTractate?.tractate_pages_selected}
                          value={selectedTractate?.tractate_pages_selected}
                        >
                          Completed
                        </MenuItem>
                      </TextField>
                    </div>
                  )}
                </div>
              ) : goal?.goal_tractates?.length === 1 ? (
                // If there is only one tractate, show its name and a page dropdown
                <div className="updateSingleTractate">
                  <Typography variant="h6" sx={{ marginBottom: "1em" }}>
                    {goal?.goal_tractates[0].tractate}
                  </Typography>
                  <TextField
                    select
                    label="Select Page"
                    value={selectedPage}
                    onChange={handlePageChange}
                  >
                    {Array.from(
                      {
                        length:
                          goal?.goal_tractates[0]?.tractate_pages_selected,
                      },
                      (_, i) => {
                        const pageNumber = Math.floor(i / 2) + 2;
                        const side = i % 2 === 0 ? "A" : "B";
                        return (
                          <MenuItem key={i} value={i}>
                            Page {pageNumber} Side {side}
                          </MenuItem>
                        );
                      }
                    )}
                    <MenuItem
                      key={goal?.goal_tractates[0]?.tractate_pages_selected}
                      value={goal?.goal_tractates[0]?.tractate_pages_selected}
                    >
                      Completed
                    </MenuItem>
                  </TextField>
                </div>
              ) : (
                // If no tractates exist, show a message
                <Typography variant="h6">You have no goals yet</Typography>
              )}
              {/* <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={(e) => handleSubmit(e)}
            >
              Delete Goal (add dlt req)
            </Button> */}
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",
              boxShadow: "none",
              backgroundColor: "var(--orange)",
              marginTop: "1em",
              width: "50%",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "3em",
            }}
          >
            {goalEditOption === "create-goal" ? "Create " : "Update "} Goal
          </Button>
        </form>
      </div>
    </Dialog>
  );
}

export default GoalPopup;
