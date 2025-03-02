import states from "../utils/dataExports/StatesExports";
import { createCommunity, updateCommunity } from "../utils/API/CommunityAPI";

function AdminDashPopup({
  setUserData,
  userData,
  setPopup,
  setPopupStatus,
  communityData,
  setCommunityData,
  popupStatus,
  capitalizeWord,
  allCommunities,
  setAllCommunities,
  rows,
  setRows,
  createSuperData,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (popupStatus) {
      case "addCommunity":
        if (communityData.name === "" || communityData.location === "") {
          alert("Please fill out all fields");
          return;
        }
        try {
          await createCommunity(communityData);
          setRows([
            ...rows,
            createSuperData(
              communityData.id,
              communityData.name,
              communityData.location,
              []
            ),
          ]);
          setPopup(false);
          setPopupStatus("");
        } catch (error) {
          console.error("Error creating community:", error);
          alert("Error creating community. Please try again.");
        }
        break;
      case "editCommunity":
        if (communityData.name === "" || communityData.location === "") {
          alert("Please fill out all fields");
          return;
        }
        try {
          await updateCommunity(communityData);
          setAllCommunities(
            allCommunities.map((community) => {
              if (community.id === communityData.id) {
                return createSuperData(
                  communityData.id,
                  communityData.name,
                  communityData.location,
                  communityData?.members
                );
              }
              return { ...community };
            })
          );
          setPopup(false);
        } catch (error) {
          console.error("Error updating community:", error);
          alert("Error updating community. Please try again.");
        }
        break;
      case "addCommunityAdmin":
        // do i update admin or community?
        break;
      case "createMember":
        // createUser(userData)
        //? should admin create all fields or at least have option?
        // * user data:
        // username: "",
        // email: "",
        // phone_number: "",
        // first_name: "",
        // last_name: "",
        // location: "", //[select state]
        // password: "",
        // password_confirmation: "",
        // community_id: int || null || "", //[select community. value is id]
        // is_community_admin: "true" || "false"
        break;
      case "editMember":
        // check each field to see if empty if yes alert
        try {
          // ! route to is update me, not any user
          // await updateUser({
          //   first_name: userData.first_name,
          //   last_name: userData.last_name,
          //   // is_community_admin: userData.is_community_admin
          // });
        } catch (e) {
          console.error("Error updating user:", e);
          alert("Error updating user. Please try again.");
        }
        break;
      default:
        console.log("Invalid popupStatus");
        break;
    }
  };

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button
          className="close-popup"
          onClick={() => {
            setPopup(false);
            setPopupStatus("");
            setCommunityData({
              name: "",
              location: "",
              members: [],
              id: "",
            });
          }}
        >
          Close
        </button>
        {popupStatus === "addCommunity" && (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                name:
                <input
                  type="text"
                  placeholder="Community Name"
                  value={communityData.name}
                  onChange={(e) =>
                    setCommunityData({
                      ...communityData,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                location:
                <select
                  value={capitalizeWord(communityData.location)}
                  onChange={(e) =>
                    setCommunityData({
                      ...communityData,
                      location: e.target.value,
                    })
                  }
                >
                  <option value="">Select state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
        {popupStatus === "editCommunity" && (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                name:
                <input
                  type="text"
                  placeholder="Community Name"
                  value={communityData.name}
                  onChange={(e) =>
                    setCommunityData({
                      ...communityData,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                location:
                <select
                  value={capitalizeWord(communityData.location)}
                  onChange={(e) =>
                    setCommunityData({
                      ...communityData,
                      location: e.target.value,
                    })
                  }
                >
                  <option value="">Select state</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
        {popupStatus === "addCommunityAdmin" && (
          <h2>Add Community Admin drop or search for user and community</h2>
        )}
        {popupStatus === "editMember" && (
          //? what info should admin/super be allowed to edit
          <form onSubmit={handleSubmit}>
            <label>
              name:
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={userData.first_name}
                onChange={handleUserDataChange}
              />
            </label>
            <label>
              last name:
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={userData.last_name}
                onChange={handleUserDataChange}
              />
            </label>
            {/* {isSuperAdmin && ( */}
            <label>
              Make Admin:
              <input
                name="is_community_admin"
                type="checkbox"
                checked={userData.is_community_admin}
                value={userData.is_community_admin}
                onChange={() =>
                  setUserData({
                    ...userData,
                    is_community_admin: !userData.is_community_admin,
                  })
                }
              />
            </label>
            {/* )} */}
            <br />
            <input type="submit" value="Submit" />
          </form>
        )}
        {popupStatus === "createMember" && (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                name:
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={userData.first_name}
                  onChange={(e) =>
                    setUserData({ ...userData, first_name: e.target.value })
                  }
                />
              </label>
              <label>
                last name:
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={userData.last_name}
                  onChange={(e) =>
                    setUserData({ ...userData, last_name: e.target.value })
                  }
                />
              </label>
              <label>
                Make Admin:
                <input
                  name="is_community_admin"
                  type="checkbox"
                  checked={userData.is_community_admin}
                  value={userData.is_community_admin}
                  onChange={() =>
                    setUserData({
                      ...userData,
                      is_community_admin: !userData.is_community_admin,
                    })
                  }
                />
              </label>
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
        {popupStatus === "viewMember" && (
          <div>
            <div>
              <h3>User Details</h3>
              <p>
                Name: {userData.first_name} {userData.last_name}
              </p>
              <p>Email: {userData.email}</p>
              <p> Phone: {userData.phone_number}</p>
              <p>Admin: {userData.is_community_admin ? "Yes" : "No"}</p>
            </div>
            <button onClick={() => setPopupStatus("editMember")}>
              Edit user
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashPopup;
