import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Box,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";
import { useLogin } from "../utils/context/LoginContext";

function LoginPopup({
  handleSignupFields,
  handleSubmit,
  userData,
  handleChange,
  handleFormToggle,
  onboardingStatus,
  setOnboardingStatus,
  allCommunities,
  allTractates,
  optionalUserData,
  userDataErrors,
}) {
  const { userStatus, setUserStatus } = useLogin();

  const reviewFieldStyle = {
    color: "var(--brown)",
    backgroundColor: "var(--light-grey)",
    borderRadius: "15px",
    padding: "0.5em 1em",
    minWidth: "11em",
    maxWidth: "12em",
    overflow: "auto",
    whiteSpace: "nowrap",
  };

  return (
    <Box
      className="loginPopup"
      style={{
        marginTop: "1.5rem",
        width: "90dvw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "23rem",
        }}
      >
        {userStatus === "Login" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("Login");
            }}
            style={{ display: "contents" }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: ".7em",
              }}
            >
              Login
            </Typography>
            <TextField
              error={userDataErrors.username !== ""}
              helperText={
                userDataErrors.username !== "" && userDataErrors.username
              }
              id="username"
              label="*Username"
              variant="outlined"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              sx={{
                marginTop: "2em",
              }}
            />
            <TextField
              error={userDataErrors.password !== ""}
              helperText={
                userDataErrors.password !== "" && userDataErrors.password
              }
              id="password"
              label="*Password"
              variant="outlined"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              sx={{ color: "var(--brown)" }}
            />
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => setUserStatus("ForgotPass")}
                sx={{
                  textTransform: "none",
                  textDecoration: "underline",
                  marginLeft: ".7em",
                  fontSize: "1em",
                  color: "var(--light-blue)",
                  height: "2em",
                }}
              >
                *Forgot Password
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "var(--brown)",
                  boxShadow: "none",
                  textTransform: "none",
                  borderRadius: "10px",
                  height: "3rem",
                  width: "7rem",
                  fontSize: ".9em",
                  marginTop: ".5em",
                }}
              >
                Login
              </Button>
            </Box>
            <Button
              type="button"
              onClick={handleFormToggle}
              sx={{
                color: "var(--black)",
                marginTop: "1em",
                left: "10em",
                textTransform: "none",
                textDecoration: "underline",
              }}
            >
              Sign up
            </Button>
          </form>
        )}
        {userStatus === "ForgotPass" && (
          // TODO: create forgot password logic
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("ForgotPass");
            }}
            style={{ display: "contents" }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Nexa, sans-serif",
                color: "var(--brown)",
                marginTop: ".7em",
              }}
            >
              Forgot Password
            </Typography>
            <TextField
              id="email"
              label="*Email"
              variant="outlined"
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              sx={{
                marginTop: "2em",
              }}
            />
            <TextField
              id="password"
              label="*Password"
              variant="outlined"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              sx={{ color: "var(--brown)" }}
            />
            <Box
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                onClick={() => setUserStatus("Login")}
                sx={{
                  backgroundColor: "var(--dark-grey)",
                  color: "var(--brown)",
                  boxShadow: "none",
                  textTransform: "none",
                  borderRadius: "10px",
                  height: "3rem",
                  width: "7rem",
                  fontSize: ".9em",
                  marginTop: ".5em",
                }}
              >
                Back
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  textDecoration: "underline",
                  marginRight: ".7em",
                  fontSize: "1em",
                  color: "var(--light-blue)",
                  height: "2em",
                }}
              >
                *Resend
              </Button>
            </Box>
          </form>
        )}
        {userStatus === "Signup" && (
          <div className="registerCard" style={{ display: "contents" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit("Register user");
              }}
              style={{ display: "contents" }}
            >
              {onboardingStatus === "Register" && (
                <div style={{ display: "contents" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Nexa, sans-serif",
                      color: "var(--brown)",
                      marginTop: ".7em",
                    }}
                  >
                    Sign Up
                  </Typography>
                  <TextField
                    error={userDataErrors.first_name !== ""}
                    helperText={
                      userDataErrors.first_name !== "" &&
                      userDataErrors.first_name
                    }
                    id="first-name"
                    label="*First Name"
                    variant="outlined"
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    sx={{
                      marginTop: "1em",
                      marginBottom: ".7em",
                    }}
                  />
                  <TextField
                    error={userDataErrors.last_name !== ""}
                    helperText={
                      userDataErrors.last_name !== "" &&
                      userDataErrors.last_name
                    }
                    id="last-name"
                    label="*Last Name"
                    variant="outlined"
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                  />
                  <TextField
                    error={userDataErrors.phone_number !== ""}
                    helperText={
                      userDataErrors.phone_number !== "" &&
                      userDataErrors.phone_number
                    }
                    id="phone-number"
                    label="Contact Number"
                    variant="outlined"
                    type="tel"
                    name="phone_number"
                    value={userData.phone_number}
                    onChange={handleChange}
                    sx={{
                      marginTop: "1em",
                      marginBottom: ".2em",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "var(--brown)",
                      width: "90%",
                      fontFamily: "Nexa, sans-serif",
                      fontSize: ".9rem",
                    }}
                  >
                    *If you would like to use the platform to find a Chavrusa we
                    highly suggest a Contact Number
                  </Typography>
                  <TextField
                    error={userDataErrors.email !== ""}
                    helperText={
                      userDataErrors.email !== "" && userDataErrors.email
                    }
                    id="email"
                    label="*Contact Email"
                    variant="outlined"
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    sx={{
                      marginTop: "1em",
                      marginBottom: ".7em",
                    }}
                  />
                  <TextField
                    error={userDataErrors.username !== ""}
                    helperText={
                      userDataErrors.username !== "" && userDataErrors.username
                    }
                    id="username"
                    label="*Contact Username"
                    variant="outlined"
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    sx={{
                      marginTop: "1em",
                      marginBottom: ".7em",
                    }}
                  />
                  <TextField
                    error={userDataErrors.password !== ""}
                    helperText={
                      userDataErrors.password !== "" && userDataErrors.password
                    }
                    id="password"
                    label="*Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    sx={{ marginBottom: ".7em" }}
                  />
                  <TextField
                    error={userDataErrors.password_confirmation !== ""}
                    helperText={
                      userDataErrors.password_confirmation !== "" &&
                      userDataErrors.password_confirmation
                    }
                    id="confirm-password"
                    label="*Confirm Password"
                    variant="outlined"
                    type="password"
                    name="password_confirmation"
                    value={userData.password_confirmation}
                    onChange={handleChange}
                    sx={{}}
                  />
                  {/* <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  sx={{
                    // marginTop: "2em",
                    ...cardStyle,
                  }}
                /> */}

                  <TextField
                    id="outlined-select-state"
                    select
                    label="State"
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                    defaultValue="Select state"
                    sx={{ marginTop: "1em" }}
                  >
                    <MenuItem key="default" value="">
                      <em>Select State</em>
                    </MenuItem>
                    {states.map((state, index) => (
                      <MenuItem key={index} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      type="button"
                      onClick={handleFormToggle}
                      sx={{
                        color: "var(--black)",
                        textTransform: "none",
                        marginRight: "2em",
                        textDecoration: "underline",
                      }}
                    >
                      Already have an account
                    </Button>
                    <Button
                      onClick={() => handleSignupFields()}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--brown)",
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "10px",
                        height: "3rem",
                        width: "7rem",
                        fontSize: ".8em",
                        marginTop: ".5em",
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </div>
              )}
              {onboardingStatus === "selectCommunity" && (
                <div style={{ display: "contents" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Nexa, sans-serif",
                      color: "var(--brown)",
                      marginTop: ".7em",
                    }}
                  >
                    Choose your Community
                  </Typography>
                  <TextField
                    id="outlined-select-community"
                    select
                    label="Community List"
                    name="community"
                    value={optionalUserData.community.id || ""}
                    onChange={handleChange}
                    defaultValue="Select Community"
                    sx={{ marginTop: "2em" }}
                  >
                    <MenuItem key="default" value="">
                      <em>Select Community</em>
                    </MenuItem>
                    {allCommunities.map((community, index) => (
                      <MenuItem key={index} value={community.id}>
                        {community.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography
                    sx={{
                      color: "var(--brown)",
                      width: "90%",
                      fontFamily: "Nexa, sans-serif",
                      fontSize: ".8rem",
                      marginTop: "-10px",
                      marginBottom: "3.5em",
                    }}
                  >
                    *Choose your community to connect with local events and
                    members. You can skip for now and join later.
                  </Typography>
                  <Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1em",
                    }}
                  >
                    <Button
                      onClick={() => setOnboardingStatus("Register")}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--dark-grey)",
                        color: "var(--brown)",
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "10px",
                        height: "3rem",
                        width: "7rem",
                        fontSize: ".8em",
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setOnboardingStatus("selectTractate")}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--brown)",
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "10px",
                        height: "3rem",
                        width: "7rem",
                        fontSize: ".8em",
                      }}
                    >
                      {optionalUserData.community.name === "" ? "Skip" : "Next"}
                    </Button>
                  </Box>
                </div>
              )}
              {onboardingStatus === "selectTractate" && (
                <div style={{ display: "contents" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Nexa, sans-serif",
                      color: "var(--brown)",
                      marginTop: ".7em",
                    }}
                  >
                    Choose your Tractate
                  </Typography>
                  <TextField
                    id="outlined-select-tractate"
                    select
                    label="Tractate"
                    name="tractate"
                    value={optionalUserData.tractate.id || ""}
                    onChange={handleChange}
                    defaultValue="Select Mesechta"
                    sx={{ marginTop: "2em" }}
                  >
                    <MenuItem key="default" value="">
                      <em>Choose a Mesechta</em>
                    </MenuItem>
                    {allTractates.map((tractate) => (
                      <MenuItem key={tractate.id} value={tractate.id}>
                        {tractate.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography
                    sx={{
                      color: "var(--brown)",
                      width: "90%",
                      fontFamily: "Nexa, sans-serif",
                      fontSize: ".8rem",
                      marginTop: "-10px",
                      marginBottom: "2em",
                    }}
                  >
                    *Select the Masechta you’re learning this year. You can skip
                    for now and choose or change it later in your profile.
                  </Typography>
                  <Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1em",
                    }}
                  >
                    <Button
                      onClick={() => setOnboardingStatus("selectCommunity")}
                      variant="contained"
                      style={{
                        backgroundColor: "var(--dark-grey)",
                        color: "var(--brown)",
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "10px",
                        height: "3rem",
                        width: "7rem",
                        fontSize: ".8em",
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setOnboardingStatus("finalize")}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--brown)",
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "10px",
                        height: "3rem",
                        width: "7rem",
                        fontSize: ".8em",
                      }}
                    >
                      {optionalUserData.tractate.name === "" ? "Skip" : "Next"}
                    </Button>
                  </Box>
                </div>
              )}
              {onboardingStatus === "finalize" && (
                <div style={{ display: "contents" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Nexa, sans-serif",
                      color: "var(--brown)",
                      marginTop: ".7em",
                    }}
                  >
                    Review your Information
                  </Typography>
                  <Box
                    sx={{
                      marginTop: "3em",
                      border: "1px solid var(--brown)",
                      borderRadius: "15px",
                      padding: "2em",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "120px" }}>
                          <Typography
                            sx={{
                              color: "var(--brown)",
                              fontSize: "1.1em",
                              fontWeight: "500",
                            }}
                          >
                            Name
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              ...reviewFieldStyle,
                            }}
                          >
                            {userData.first_name + " " + userData.last_name}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "120px" }}>
                          <Typography
                            sx={{
                              color: "var(--brown)",
                              fontSize: "1.1em",
                              fontWeight: "500",
                            }}
                          >
                            Number
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              ...reviewFieldStyle,
                            }}
                          >
                            {userData.phone_number || "—"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "120px" }}>
                          <Typography
                            sx={{
                              color: "var(--brown)",
                              fontSize: "1.1em",
                              fontWeight: "500",
                            }}
                          >
                            Email
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              ...reviewFieldStyle,
                            }}
                          >
                            {userData.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "120px" }}>
                          <Typography
                            sx={{
                              color: "var(--brown)",
                              fontSize: "1.1em",
                              fontWeight: "500",
                            }}
                          >
                            State
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              ...reviewFieldStyle,
                            }}
                          >
                            {userData.location || "—"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "120px" }}>
                          <Typography
                            sx={{
                              color: "var(--brown)",
                              fontSize: "1.1em",
                              fontWeight: "500",
                            }}
                          >
                            Masechta
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              ...reviewFieldStyle,
                            }}
                          >
                            {optionalUserData.tractate.name || "—"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ width: "120px" }}>
                          <Typography
                            sx={{
                              color: "var(--brown)",
                              fontSize: "1.1em",
                              fontWeight: "500",
                            }}
                          >
                            Community
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              ...reviewFieldStyle,
                            }}
                          >
                            {optionalUserData.community.name || "—"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {userData.profileImage && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "1.5em",
                          right: "2em",
                        }}
                      >
                        <Box
                          component="img"
                          src={userData.profileImage}
                          alt="Profile"
                          sx={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "2em",
                    }}
                  >
                    <Button
                      onClick={() => setOnboardingStatus("selectTractate")}
                      variant="contained"
                      style={{
                        backgroundColor: "var(--dark-grey)",
                        color: "var(--brown)",
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "15px",
                        height: "3rem",
                        width: "7rem",
                        fontSize: ".8em",
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--brown)",
                        boxShadow: "none",
                        textTransform: "none",
                        borderRadius: "10px",
                        height: "3rem",
                        width: "7rem",
                        fontSize: ".8em",
                      }}
                    >
                      Confirm
                    </Button>
                  </Box>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </Box>
  );
}

export default LoginPopup;
