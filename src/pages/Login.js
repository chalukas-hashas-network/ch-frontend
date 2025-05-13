import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../utils/context/LoginContext";
import { useUser } from "../utils/context/UserContext";
import { createUser } from "../utils/API/UserAPI";
import { Box, Button, CloseRoundedIcon } from "../utils/dataExports/muiExports";
import LoginPopup from "../components/LoginPopup";
import { useTractate } from "../utils/context/TractateContext";
import { useCommunity } from "../utils/context/CommunityContext";

// TODO: make sure username and email are unique on signup. create logic for inviting admin
// forgot password
// need to check if user is already signed up

function Login() {
  const location = useLocation();
  const { login, triggerLoading } = useUser();
  const { userStatus, setUserStatus } = useLogin();
  const {allTractates, getAllTractateData} = useTractate();
  const {allCommunities, getAllCommunityData} = useCommunity();
  const navigate = useNavigate();

  const [onboardingStatus, setOnboardingStatus] = useState("Register");
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
    community: { name: "", id: "" },
    tractate: { name: "", id: "" },
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

  useEffect(() => {
    if (onboardingStatus === "selectCommunity") {
      getAllCommunityData();
      getAllTractateData();
    }
  }, [onboardingStatus, getAllCommunityData, getAllTractateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "community") {
      const selectedCommunity = allCommunities.find(
        (community) => community.id === value
      );

      setOptionalUserData({
        ...optionalUserData,
        community: { name: selectedCommunity?.name || "", id: value || "" },
      });
    } else if (name === "tractate") {
      const selectedTractate = allTractates.find(
        (tractate) => tractate.id === value
      );

      setOptionalUserData({
        ...optionalUserData,
        tractate: { name: selectedTractate?.name || "", id: value || "" },
      });
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
          navigate(-1);
        } catch (err) {
          alert("Invalid credentials");
          return;
        }
      }
    } else if (e === "Register user") {
      // TODO: need a way to check if username or email exist (before user can click next)
      // onClick "next" make fetch req, if successful change onboardingstatus, else show error message
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
    } else if (e === "ForgotPass") {
      // TODO: create logic
    }
  };

  const reset = () => {
    setUserStatus("Login");
    setOptionalUserData({
      community: { name: "", id: "" },
      tractate: { name: "", id: "" },
    });
    setUserData({
      email: "",
      // username: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      location: "",
    });
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
        overflow: "auto",
      }}
    >
      <Button
        onClick={() => {
          navigate(-1);
          reset();
        }}
        sx={{
          position: "absolute",
          top: { xs: "1.5em", md: "2em" },
          right: { xs: "1em", md: "3em" },
          boxShadow: "none",
        }}
      >
        <CloseRoundedIcon style={{ color: "var(--black)" }} />
      </Button>
      <LoginPopup
        handleSignupFields={handleSignupFields}
        handleSubmit={handleSubmit}
        userData={userData}
        handleChange={handleChange}
        handleFormToggle={handleFormToggle}
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
