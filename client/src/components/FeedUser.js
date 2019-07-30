import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import ThumbUp from "@material-ui/icons/ThumbUp";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Reply from "@material-ui/icons/Reply";
import Star from "@material-ui/icons/Star";
import defaultProfilePic from "../assets/default-profile-pic.png";

import { StyledButton } from "../themes/theme";
import AudioPlayer from "./AudioPlayer";
import ReplyDialog from "./ReplyDialog";
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
