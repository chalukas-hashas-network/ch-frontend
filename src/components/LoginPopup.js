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
  cardStyle,
  handleFormToggle,
  onboardingStatus,
  setOnboardingStatus,
  allCommunities,
  allTractates,
  optionalUserData,
}) {
  const { userStatus, setUserStatus } = useLogin();

  return (
    <Box
      className="loginPopup"
      style={{
        marginTop: "7dvw",
        width: "90dvw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {userStatus === "Login" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("Login");
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "23rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: "Nexa, sans-serif", color: "var(--brown)" }}
          >
            Login
          </Typography>
          <TextField
            required
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            sx={{
              marginTop: "2em",
              ...cardStyle,
            }}
          />
          <TextField
            required
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            sx={{
              ...cardStyle,
            }}
          />
          <Box
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                textDecoration: "underline",
                marginRight: "2em",
              }}
            >
              *forgot password
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "var(--brown)",
                width: "40%",
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      )}
      {userStatus === "Signup" && (
        <div
          className="registerCard"
          style={{
            textAlign: "center",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit("Register user");
            }}
          >
            {onboardingStatus === "Register" && (
              <div>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nexa, sans-serif", color: "var(--brown)" }}
                >
                  Register
                </Typography>
                <TextField
                  required
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  sx={{
                    marginTop: "2em",
                    ...cardStyle,
                  }}
                />
                <TextField
                  required
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  sx={{
                    ...cardStyle,
                  }}
                />
                <TextField
                  required
                  id="confirm-password"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  name="password_confirmation"
                  value={userData.password_confirmation}
                  onChange={handleChange}
                  sx={{
                    ...cardStyle,
                  }}
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
                  required
                  id="first-name"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  sx={{
                    ...cardStyle,
                  }}
                />
                <TextField
                  required
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  sx={{
                    ...cardStyle,
                  }}
                />
                <TextField
                  id="phone-number"
                  label="Phone Number"
                  variant="outlined"
                  type="tel"
                  name="phone_number"
                  value={userData.phone_number}
                  onChange={handleChange}
                  sx={{
                    ...cardStyle,
                  }}
                />
                <TextField
                  id="outlined-select-state"
                  select
                  label="State"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  defaultValue="Select state"
                  sx={{
                    ...cardStyle,
                  }}
                >
                  {states.map((state, index) => (
                    <MenuItem key={index} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  onClick={() => handleSignupFields()}
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--brown)",
                    boxShadow: "none",
                    textTransform: "none",
                    width: "40%",
                    right: "10px",
                  }}
                >
                  Next
                </Button>
              </div>
            )}
            {onboardingStatus === "selectCommunity" && (
              <div>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nexa, sans-serif", color: "var(--brown)" }}
                >
                  Choose your Community
                </Typography>
                <TextField
                  id="outlined-select-community"
                  select
                  label="Community"
                  name="community"
                  value={optionalUserData.community || ""}
                  onChange={handleChange}
                  defaultValue="Select Community"
                  sx={{
                    ...cardStyle,
                  }}
                >
                  <MenuItem disabled key="default" value="">
                    <em>Select Community</em>
                  </MenuItem>
                  {allCommunities.map((community, index) => (
                    <MenuItem key={index} value={community.id}>
                      {community.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography variant="body2">
                  *A community can be selected later
                </Typography>
                <Button
                  onClick={() => setOnboardingStatus("Register")}
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--brown)",
                    boxShadow: "none",
                    width: "40%",
                    right: "10px",
                    marginRight: "1em",
                    textTransform: "none",
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
                    width: "40%",
                    right: "10px",
                    textTransform: "none",
                  }}
                >
                  Next
                </Button>
              </div>
            )}
            {onboardingStatus === "selectTractate" && (
              <div>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nexa, sans-serif", color: "var(--brown)" }}
                >
                  Choose your Tractate
                </Typography>
                <TextField
                  id="outlined-select-community"
                  select
                  label="Tractate"
                  name="tractate"
                  value={optionalUserData.tractate || ""}
                  onChange={handleChange}
                  defaultValue="Select Community"
                  sx={{
                    ...cardStyle,
                  }}
                >
                  <MenuItem disabled key="default" value="">
                    <em>Choose a Mesechta</em>
                  </MenuItem>
                  {allTractates.map((tractate) => (
                    <MenuItem key={tractate.id} value={tractate.id}>
                      {tractate.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography variant="body2">
                  *A Mesechta can be selected later
                </Typography>
                <Button
                  onClick={() => setOnboardingStatus("selectCommunity")}
                  variant="contained"
                  style={{
                    backgroundColor: "var(--brown)",
                    boxShadow: "none",
                    width: "40%",
                    right: "10px",
                    marginRight: "1em",
                    textTransform: "none",
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
                    width: "40%",
                    right: "10px",
                    textTransform: "none",
                  }}
                >
                  Next
                </Button>
              </div>
            )}
            {onboardingStatus === "finalize" && (
              <div>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nexa, sans-serif", color: "var(--brown)" }}
                >
                  Review & Submit
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--brown)",
                    boxShadow: "none",
                    width: "40%",
                    right: "10px",
                    textTransform: "none",
                  }}
                >
                  Finish Up
                </Button>
              </div>
            )}
          </form>
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          maxWidth: "23rem",
        }}
      >
        <Button
          type="button"
          onClick={handleFormToggle}
          sx={{
            color: "var(--black)",
            marginTop: { md: "1em" },
            right: "10px",
            textTransform: "none",
          }}
        >
          {userStatus === "Login" ? "Sign up" : "Log in"}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPopup;
