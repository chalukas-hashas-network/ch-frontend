import {
  List,
  Box,
  ListItem,
  ListItemText,
  Typography,
} from "../utils/dataExports/muiExports";

function LiveUpdates() {
  return (
    <Box
      className="members"
      sx={{
        backgroundColor: "var(--dark-grey)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        maxWidth: 450,
        maxHeight: 400,
        minHeight: 100,
        padding: "8px",
        paddingTop: "12px",
        paddingBottom: "12px",
        position: "relative",
      }}
    >
      <List
        sx={{
          width: "100%",
          overflowY: "auto",
          gap: 1,
          bgcolor: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 3.5,
            color: "var(--black)",
            fontSize: "1rem",
            fontFamily: "Nexa, sans-serif",
          }}
        >
          Global Live Updates
        </Typography>
        {/* {members?.length > 0 ? (
            members?.map((member, index) => (
              <ListItem
                alignItems="flex-start"
                key={index}
                sx={{
                  backgroundColor: "var(--light-grey)",
                    borderRadius: "20px",
                    maxWidth: "95%",
                    height: "3.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
              >
                <ListItemText
                 slotProps={{
                    primary: {
                        sx: {
                        fontSize: ".9rem",
                        },
                    },
                    }}
                  primary={`${capitalizeWord(
                    member.first_name
                  )} ${capitalizeWord(member.last_name)}`}
                  secondary={
                    <Fragment>
                      <Typography sx={{fontSize: ".45rem", color: "var(--light-blue)"}}>
                      //TODO: set up logic for time
                          26 Minutes ago
                        </Typography>
                        <Typography sx={{fontSize: ".55rem", color: "var(--black)"}}>
                        With {capitalizeWord(member.community)}
                      </Typography>
                    </Fragment>
                  }
                />
              </ListItem>
            ))
          ) : ( */}
        <ListItem
          alignItems="flex-start"
          sx={{
            backgroundColor: "var(--light-grey)",
            borderRadius: "20px",
            maxWidth: "95%",
            height: "3.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ListItemText
            slotProps={{
              primary: {
                sx: {
                  fontSize: "1rem",
                },
              },
            }}
            primary="No members to display yet"
          />
        </ListItem>
        {/* )}  */}
      </List>
    </Box>
  );
}

export default LiveUpdates;
