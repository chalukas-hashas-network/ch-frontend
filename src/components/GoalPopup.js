import { useState } from "react";
import { useUser } from "../utils/Context";
import { talmudTractates } from "../utils/dataExports/talmudTractates";
function GoalPopup({setOpenGoal}) {
      const [selectedTractate, setSelectedTractate] = useState("");
    
      const { user } = useUser();
    
      const handleTractateChange = (e) => {
        setSelectedTractate(e.target.value);
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
    <div className="popup-overlay">
      <div className="popup-card">
        <h6 onClick={() => setOpenGoal(false)}>X</h6>
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
      </div>
    </div>
  );
}

export default GoalPopup;
