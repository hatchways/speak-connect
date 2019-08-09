import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import defaultProfilePic from "../../assets/default-profile-pic.png";

const useStyles = makeStyles(theme => ({
  primaryText: {
    fontWeight: "bold"
  },
  secondaryText: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#adadad" // grey
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    maxWidth: "50px",
    maxHeight: "50px",
    minWidth: "50px",
    minHeight: "50px",

    objectFit: "cover",
    borderRadius: "50%",
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: "none",
    "&:visted": {
      textDecoration: "none"
    }
  }
}));

// display a users name, username and profile pic
// used for the conversation and comments
function UserInfoHeader(props) {
  const classes = useStyles();
  const { name, username, imageUrl, userID, loggedInUserID } = props;

  return (
    <Grid container alignItems="center">
      <Grid item id="profilePicture">
        <img
          src={imageUrl ? imageUrl : defaultProfilePic}
          className={classes.profilePicture}
          alt="Profile pic"
        />
      </Grid>
      <Grid item id="name" style={{ marginRight: "8px" }}>
        <Typography className={classes.primaryText}>{name}</Typography>
      </Grid>
      <Grid item id="username">
        {/* create a link to the conversation user's profile page */}
        <Link
          to={{
            pathname: `/profile/${userID}`,
            state: { id: loggedInUserID }
          }}
          className={classes.link}
        >
          <Typography className={classes.secondaryText}>@{username}</Typography>
        </Link>
      </Grid>
    </Grid>
  );
}

export default UserInfoHeader;
