import {
  Button,
  TextField,
  Typography,
  MenuItem,
} from "../utils/dataExports/muiExports";
import states from "../utils/dataExports/StatesExports";
import { useLogin } from "../utils/Context";

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
  optionalUserData,
}) {
  const { userStatus, setUserStatus } = useLogin();

  return (
    <article className="input" style={{ marginTop: "7dvw" }}>
      {userStatus === "Login" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit("Login");
          }}
        >
          <Typography variant="h5">Login</Typography>
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
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "var(--black)",
              width: "90%",
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Login
          </Button>
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
                <Typography variant="h5">Register</Typography>
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
                    backgroundColor: "var(--black)",
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
                <Typography variant="h5">Choose your Community</Typography>
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
                    backgroundColor: "var(--black)",
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
                    backgroundColor: "var(--black)",
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
                <Typography variant="h5">Choose your Tractate</Typography>
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
                  {allCommunities.map((community, index) => (
                    <MenuItem key={index} value={community.id}>
                      {community.name}
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
                    backgroundColor: "var(--black)",
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
                  //   type="submit"
                  onClick={() => setOnboardingStatus("finalize")}
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--black)",
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
                <Typography variant="h5">Review & Submit</Typography>
                
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--black)",
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

      <Button
        type="button"
        onClick={handleFormToggle}
        sx={{
          color: "var(--black)",
          position: "absolute",
          marginTop: { md: "1em" },
          right: { xs: "30px", md: "35dvw" },
          textTransform: "none",
        }}
      >
        {userStatus === "Login" ? "Sign up" : "Log in"}
      </Button>
    </article>
  );
}

export default LoginPopup;
