// forgot password
// need to check if user is already signed up
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser, useLogin } from "../utils/Context";
import { createUser } from "../utils/API/UserAPI";
import { getCommunities } from "../utils/API/CommunityAPI";
import { getAllTractates } from "../utils/API/GoalAPI";
import {
  Box,
  Button,
  CloseRoundedIcon,
} from "../utils/dataExports/muiExports";
import LoginPopup from "./LoginPopup";

// TODO: make sure username and email are unique on signup. create logic for inviting admin
// TODO: make signup one page, make fields "required" if needed

function Login() {
  const location = useLocation();
  const { login, triggerLoading } = useUser();
  const { setLoginOpen, userStatus, setUserStatus } = useLogin();
  const navigate = useNavigate();

  const [onboardingStatus, setOnboardingStatus] = useState("Register");
  const [allCommunities, setAllCommunities] = useState([]);
  const [allTractates, setAllTractates] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    // username: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    location: "",
  });
  const [optionalUserData, setOptionalUserData] = useState({
    community: null,
    tractate: null,
  });

  useEffect(
    function checkPathForAction() {
      if (location.pathname.includes("/invite")) {
        setUserStatus("Signup");
      }

      if (location.pathname.includes("/adminInvite")) {
        // ? make login a page and include community ID in route
        // TODO: set up logic to make user admin
        // if user exists, log them in, else sign them up
      }
    },
    [location.pathname]
  );

  useEffect(
    function getAllDataForOnboarding() {
      if (
        onboardingStatus === "selectCommunity" &&
        allCommunities.length <= 0
      ) {
        const fetchCommunities = async () => {
          try {
            const communities = await getCommunities();
            setAllCommunities(communities);
          } catch (err) {
            console.log(err);
            alert("Failed to load communities");
          }
        };
        fetchCommunities();
      }

      if (onboardingStatus === "selectTractate" && allTractates.length <= 0) {
        const fetchTractates = async () => {
          try {
            const tractates = await getAllTractates();
            setAllTractates(tractates);
          } catch (err) {
            alert("Failed to load tractates");
          }
        };
        fetchTractates();
      }
    },
    [onboardingStatus]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "community" || name === "tractate") {
      setOptionalUserData({ ...optionalUserData, [name]: value });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSignupFields = () => {
    // ! username was taken out but needs to be added until backend is updated
    if (userStatus === "Signup") {
      if (userData.password !== userData.password_confirmation) {
        alert("Passwords do not match");
        return;
      }

      let missingFields = [];

      // Collect all the missing fields
      for (let key in userData) {
        if (
          userData[key] === "" &&
          key !== "location" &&
          key !== "phone_number"
        ) {
          missingFields.push(key.replace("_", " "));
        }
      }

      // If any fields are missing, alert them
      if (missingFields.length > 0) {
        alert(
          `Please fill out the following fields: ${missingFields.join(", ")}`
        );
        return; // Exit the function early
      }

      if (
        userData.phone_number !== "" &&
        userData.phone_number.length !== 10 &&
        !/^\d{10}$/.test(userData.phone_number)
      ) {
        alert("Please enter a valid phone number");
        return;
      }
      setOnboardingStatus("selectCommunity");
    }
  };

  const handleFormToggle = () => {
    setUserStatus(userStatus === "Login" ? "Signup" : "Login");
  };

  const handleSubmit = async (e) => {
    if (e === "Login") {
      if (userData.username === "" || userData.password === "") {
        alert("Fields cannot be empty");
      } else {
        try {
          await login(userData.username, userData.password);
          triggerLoading();
          setLoginOpen(false);
          navigate(location.pathname);
        } catch (err) {
          alert("Invalid credentials");
          return;
        }
      }
    } else if (e === "Register user") {
      // TODO: need a way to check if username or email exist (before user can click next)
      // ? fetch that checks if username or email exist in DB?
      // TODO: need to create user, then set their community if one was selected, then create goal if it was selected
      try {
        const user = await createUser(userData);
        try {
          // update user (and user state?) to add community
          // ? can i add community and/or goal upon register or do i need to update user after?
        } catch (err) {
          alert("Error connecting to a community");
        }
        // console.log("User created", user);
        // if (user === "Account successfully created") {
        navigate("/goal");
        // } else {
        // alert("Error creating user");
        // }
      } catch (err) {
        console.error("Error creating user", err);
        alert("Error creating user");
        return;
      }
    }
  };

  const cardStyle = {
    width: "90%",
    marginBottom: "1em",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      color: "black",
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "var(--light-grey)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--black)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--brown)",
    },
  };

  return (
    <Box
      className="container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => {
          setLoginOpen(false);
          setUserStatus("Login");
        }}
        style={{
          position: "absolute",
          top: "30px",
          right: "10px",
          boxShadow: "none",
        }}
      >
        <CloseRoundedIcon style={{ color: "black" }} />
      </Button>
      <LoginPopup
        handleSignupFields={handleSignupFields}
        handleSubmit={handleSubmit}
        userData={userData}
        handleChange={handleChange}
        handleFormToggle={handleFormToggle}
        cardStyle={cardStyle}
        onboardingStatus={onboardingStatus}
        setOnboardingStatus={setOnboardingStatus}
        allCommunities={allCommunities}
        optionalUserData={optionalUserData}
        allTractates={allTractates}
      />
    </Box>
  );
}

export default Login;
