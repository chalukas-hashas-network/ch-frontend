import { useEffect } from "react";
import {
  Dialog,
  Card,
  Button,
  CloseRoundedIcon,
  Typography,
} from "../utils/dataExports/muiExports";
import { useLogin } from "../utils/context/LoginContext";
import { useUser } from "../utils/context/UserContext";
import { updateUser } from "../utils/API/UserAPI";

function JoinCommunityPopup({ setJoinPopup, joinPopup }) {
  const { user, setUser } = useUser();
  const { setLoginOpen } = useLogin();
  const { community } = joinPopup;

  useEffect(function checkIfUserIsLoggedIn() {
    if (!user.id) {
      setLoginOpen(true);
      setJoinPopup({ isOpen: false, community: null });
    }
  }, []);

  const JoinCommunity = async (e) => {
    if (e === "join") {
      // fetch and set user
      try {
        // ! this is the wrong data setup for the fetch
        //   const res = await updateUser({community: community.id});
        //   setUser({...user, community: community})
        alert(`You have joined ${community.name}`);
        setJoinPopup({ isOpen: false, community: null });
      } catch (err) {
        console.log("Couldn't join community: ", err);
      }
    } else {
      // TODO: build request
      alert("A request for you to change communities has been sent");
    }
  };

  return (
    <>
      {user.id && (
        <Dialog
          open={true}
          className="popup-overlay"
          onClose={() => setJoinPopup({ isOpen: false, community: null })}
          PaperComponent={Card}
        >
          <div
            className="popup-card"
            style={{
              position: "relative",
              height: "23em",
              width: "20em",
            }}
          >
            <Button
              onClick={() => {
                setJoinPopup({ isOpen: false, community: null });
              }}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseRoundedIcon style={{ color: "var(--orange)" }} />
            </Button>
            <div style={{ marginTop: "3em" }}>
              {!user?.community && (
                // if user doenst have a community
                <div>
                  <Typography>
                    Are you sure you would like to join this community?
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--orange)",
                      marginTop: "1em",
                      width: "50%",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "3em",
                      textTransform: "none",
                      boxShadow: "none",
                      borderRadius: "10px",
                    }}
                    onClick={() => JoinCommunity("join")}
                  >
                    Join
                  </Button>
                </div>
              )}
              {user?.community && user?.community?.id !== community.id && (
                // if the user isnt a part of the community
                <div>
                  <Typography>
                    Are you sure you would like to change communities?
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--orange)",
                      marginTop: "1em",
                      width: "50%",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "3em",
                      textTransform: "none",
                      boxShadow: "none",
                      borderRadius: "10px",
                    }}
                    onClick={() => JoinCommunity("change")}
                  >
                    Join
                  </Button>
                </div>
              )}
              {user?.community?.id === community.id && (
                // if the user is already a part of the community
                <div>
                  <Typography>
                    You are already a part of this community
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default JoinCommunityPopup;
