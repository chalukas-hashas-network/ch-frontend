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
// TODO: make sure data type for page number, if string then convert to int where necessary, if int, make sure its reflective everywhere
// ? why cant user update page to be 0?

function GoalPopup({
  setOpenGoal,
  goalEditOption,
  setGoalEditOption,
  tractates,
  // goal,
  user,
  setSelectedTractateData,
}) {
  const { goal } = user;

  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedTractate, setSelectedTractate] = useState({
    id: "",
    tractate: "",
  });

  const resetData = () => {
    setSelectedTractate({ id: "", tractate: "" });
    setSelectedPage(0);
    setOpenGoal(false);
    setGoalEditOption("");
  };

  const currentYear = new Date().getFullYear();

  // Handle change for selecting tractate
  const handleTractateChange = (e) => {
    const selectedGoal = goal.goal_tractates.find(
      (tractate) => tractate.id === e.target.value
    );
    setSelectedTractate(selectedGoal || { id: "", tractate: "" });
    setSelectedPage(selectedGoal?.tractate_pages_completed || 0); // Reset page selection
  };

  // Handle change for selecting page number
  const handlePageChange = (e) => {
    console.log("page change", e.target.value);
    setSelectedPage(e.target.value);
  };

  // Initialize selected tractate and page when goal has exactly one tractate
  useEffect(
    function initializeSingleTractateGoal() {
      if (
        goal?.goal_tractates?.length === 1 &&
        goalEditOption === "update-goal"
      ) {
        // console.log("goal: ", goal);
        // * is a number
        setSelectedTractate(goal.goal_tractates[0]);
        setSelectedPage(goal.goal_tractates[0].tractate_pages_completed || 0); // Default to completed pages
      }
    },
    [goal]
  );

  const handleTractateCreateChange = (e) => {
    const selectedTractate = tractates.find(
      (tractate) => tractate.id === e.target.value
    );
    // * is a number
    setSelectedTractate(selectedTractate || { id: "", tractate: "" });
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
          // TODO: response should return updated goal, not just new goal.goal_tractate

          if (!goal?.year?.includes(currentYear)) {
            // ! get newGoal id to use in creating tractate goal
            const newGoal = await createAnnualGoal(
              user.id,
              `${currentYear - 1}-${currentYear}`
            );
            debugger;
            // setUser(user.goal = {id: newGoal.id})
            console.log("created new goal for " + currentYear);
          }

          // ! wont work if user is creating goal for first time
          const response = await createTractateGoal(
            goal.id,
            selectedTractate.id
          );


          /*
          update user object with updated response
          update data: 
          
          goal.
          user_percentage_completed:
          user_total_completed_pages: 
          user_total_selected_pages: 
          goal_tractates.
          tractate: selectedTractate.name
          tractate_pages_completed: 0.0
          tractate_pages_selected: selectedTractate.number_of_pages
          */

          // console.log(response);
          // TODO: update state
          alert("Goal created");
          // setSelectedTractate("Select tractate");
          // setOpenGoal(false);
          resetData();
        } catch (error) {
          console.error("Error updating user goal:", error);
        }
        console.log("Selected tractate:", selectedTractate);
        // setSelectedTractate("Select tractate");
        // setOpenGoal(false);
        resetData();
        break;
      case "update-goal":
        const pageAsFloat = parseFloat(selectedPage);
        try {
          // ! cant make the page 0
          const response = await updateTractateProgress(
            selectedTractate.id,
            pageAsFloat
          );

          const updatedTractate = goal.goal_tractates.find(
            (tractate) => tractate.id === selectedTractate.id
          );

          // Calculate the difference in completed pages and update the total
          // If user decreased their progress, subtract the difference from total
          if (updatedTractate.tractate_pages_completed > pageAsFloat) {
            goal.user_total_completed_pages =
              goal.user_total_completed_pages -
              (updatedTractate.tractate_pages_completed - pageAsFloat);
            // If user increased their progress, add the difference to total
          } else if (updatedTractate.tractate_pages_completed < pageAsFloat) {
            goal.user_total_completed_pages =
              goal.user_total_completed_pages +
              (pageAsFloat - updatedTractate.tractate_pages_completed);
          }

          // update the specific tractates completed pages
          updatedTractate.tractate_pages_completed = pageAsFloat;

          goal.user_percentage_completed = Number(
            (
              (goal.user_total_completed_pages /
                goal.user_total_selected_pages) *
              100
            ).toFixed(2)
          );

          setSelectedTractateData({
            ...selectedTractate,
            tractate: "total",
            percentage_completed: goal.user_percentage_completed,
            pages_completed: goal.user_total_completed_pages,
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
      className="popup-overlay"
      onClose={() => resetData()}
      PaperComponent={Card}
    >
      <div
        className="popup-card"
        style={{
          position: "relative",
          height: "20em",
          width: "20em",
        }}
      >
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
                select
                label="Select Tractate"
                value={selectedTractate.id || ""}
                onChange={handleTractateCreateChange}
                sx={{
                  width: "90%",
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--orange-light)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--orange)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                }}
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
                    select
                    label="Select Tractate"
                    value={selectedTractate.id || ""}
                    onChange={handleTractateChange}
                    sx={{
                      width: "90%",
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--orange-light)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                    }}
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
                        sx={{
                          width: "90%",
                          "& .MuiOutlinedInput-root": {
                            color: "black",
                            "& fieldset": {
                              borderColor: "black",
                            },
                            "&:hover fieldset": {
                              borderColor: "var(--orange-light)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange)",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "black",
                          },
                        }}
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
                    sx={{
                      width: "90%",
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--orange-light)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--orange)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                    }}
                  >
                    {Array.from(
                      { length: goal?.goal_tractates[0]?.tractate_pages_selected },
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
