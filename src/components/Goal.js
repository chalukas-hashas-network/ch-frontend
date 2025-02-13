import { Link } from "react-router-dom";
import { useState } from "react";

function Goal() {
  const [openGoal, setOpenGoal] = useState(false);

console.log("openGoal " + openGoal)
  return (
    <>
    <div>
    
    {/* <div onClick={(e)=>setOpenGoal(openGoal ? false : true)}> */}
    {/* <div class={`${openGoal && "filter blur-sm"}`}> */}
    
      <Link style={{ textDecoration: "none", color: "black"}} to="/profile">
        {"< Back"}
      </Link>
      <div className="card">User progress bar</div>
      <div>
        <div className="card" onClick={(e)=>setOpenGoal(true)}>select goal</div>
        <div className="card" onClick={(e)=>setOpenGoal(true)}>update goal</div>
      </div>
      {openGoal && (
        <div className="card">
          <h6 onClick={(e)=>setOpenGoal(false)}>X</h6>
          goal open
          </div>
      )}
    </div>
      </>
  );
}

export default Goal;
