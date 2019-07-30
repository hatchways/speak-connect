import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ConversationPost from "./ConversationPost";

const useStyles = makeStyles(theme => ({
  root: {
    width: "750px",
    height: "500px",
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    borderRadius: "5px",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5)
  }
}));

function FeedUser(props) {
  const classes = useStyles();
  const { name, username, imageUrl, title, audioURL } = props;

  return (
    <div className={classes.root}>
      <ConversationPost
        name={name}
        username={username}
        imageUrl={imageUrl}
        title={title}
        audioURL={audioURL}
      />
    </div>
  );
}

export default FeedUser;
