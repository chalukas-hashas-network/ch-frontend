import { useState, useEffect } from "react";
import {
  createTractateGoal,
  updateTractateProgress,
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

// TODO: update users state when goal is created or updated
// TODO: make sure data type for page number, if string then convert to int where necessary, if int, make sure its refelective everywhere

function GoalPopup({
  setOpenGoal,
  goalEditOption,
  setGoalEditOption,
  tractates,
  goal,
}) {
  const [selectedTractate, setSelectedTractate] = useState({
    id: "",
    tractate: "",
  });
  const [selectedPage, setSelectedPage] = useState(0);

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
      if (goal?.goal_tractates?.length === 1) {
        console.log("goal: ", goal);
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
          const response = await createTractateGoal(
            goal.id,
            selectedTractate.id
          );
          console.log(response);
          // setUser(response);
          alert("Goal created");
          setSelectedTractate("Select tractate");
          setOpenGoal(false);
        } catch (error) {
          console.error("Error updating user goal:", error);
        }
        console.log("Selected tractate:", selectedTractate);
        setSelectedTractate("Select tractate");
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
    <Dialog
      open={true}
      className="popup-overlay"
      onClose={() => setOpenGoal(false)}
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
          onClick={() => {
            setOpenGoal(false);
            setGoalEditOption("");
          }}
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
                          {
                            length:
                              selectedTractate?.tractate_pages_selected * 2 - 1,
                          },
                          (_, i) => {
                            const pageNumber = Math.floor(i / 2);
                            const side = i % 2 === 0 ? "A" : "B";
                            return (
                              <MenuItem key={i} value={i}>
                                Page {pageNumber + 2} Side {side}
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
                  <h3>{goal?.goal_tractates[0].tractate}</h3>
                  <TextField
                    select
                    label="Select Page"
                    value={selectedPage.tractate}
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
                      {
                        length:
                          goal?.goal_tractates[0]?.tractate_pages_selected * 2 -
                          1,
                      },
                      (_, i) => {
                        const pageNumber = Math.floor(i / 2);
                        const side = i % 2 === 0 ? "A" : "B";
                        return (
                          <MenuItem key={i} value={i}>
                            Page {pageNumber + 2} Side {side}
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
                <Typography variant="h5">User has no tractate goals</Typography>
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
            {goalEditOption === "create-goal" ? "Create Goal" : "Update Goal"}
          </Button>
        </form>
      </div>
    </Dialog>
  );
}

export default GoalPopup;
