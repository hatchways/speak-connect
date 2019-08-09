import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import AudioPlayer from "../AudioPlayer";
import UserInfoHeader from "./UserInfoHeader";

const useStyles = makeStyles(theme => ({
  primaryText: {
    fontWeight: "bold"
  },
  secondaryText: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#adadad" // grey
  },
  commentsContainer: {
    marginTop: theme.spacing(3),
    paddingBottom: theme.spacing(6)
  },
  comment: {
    marginBottom: theme.spacing(4)
  },
  item: {
    marginRight: theme.spacing(2)
  }
}));

// display the comments for a conversation
function Comments(props) {
  const classes = useStyles();
  const { parentUsername, comments } = props;
  const { loggedInUserID } = props;

  const generateComments = () => {
    // loop through and create the comments
    const commentComponents = comments.map(comment => (
      <Grid item key={comment._id} className={classes.comment}>
        <UserInfoHeader
          name={comment.author.name}
          username={comment.author.username}
          imageUrl={comment.author.imageUrl}
          userID={comment.author._id}
          loggedInUserID={loggedInUserID}
        />
        <Typography
          className={classes.secondaryText}
          style={{ marginLeft: "65px", marginBottom: "5px" }}
        >
          replying to @{parentUsername}
        </Typography>
        <div style={{ marginLeft: "65px" }}>
          <AudioPlayer audioURL={comment.audio} />
        </div>
      </Grid>
    ));
    return commentComponents;
  };

  return (
    <Grid container alignItems="center" className={classes.commentsContainer}>
      {generateComments()}
    </Grid>
  );
}

export default Comments;
