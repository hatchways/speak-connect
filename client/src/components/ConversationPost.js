import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import ThumbUp from "@material-ui/icons/ThumbUp";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Star from "@material-ui/icons/Star";
import defaultProfilePic from "../assets/default-profile-pic.png";

import { StyledButton } from "../themes/theme";
import AudioPlayer from "./AudioPlayer";
import ReplyDialog from "./ReplyDialog";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  primaryText: {
    fontWeight: "bold"
  },
  secondaryText: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#adadad" // grey
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width: "90%"
  },
  item: {
    marginRight: theme.spacing(2)
  },
  icon: {
    color: "#dfe3f0", // blue grey
    marginRight: theme.spacing(1)
  },
  text: {
    fontWeight: "bold"
  },
  button: {
    color: "black"
  },
  divider: {
    // make divider same size as panel
    position: "relative",
    left: "-40px",
    width: "790px"
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
  }
}));

function ConversationPost(props) {
  const classes = useStyles();
  const { name, username, imageUrl, title, audioURL } = props;
  const { userID, convoID } = props;


  const generateHeader = () => {
    return (
      <div>
        <Grid container alignItems="center" style={{ marginTop: "20px" }}>
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
            <Typography className={classes.secondaryText}>
              @{username}
            </Typography>
          </Grid>
        </Grid>

        <Typography className={classes.title}>{title}</Typography>
        <AudioPlayer audioURL={audioURL} />

        <Grid container alignItems="center" className={classes.container}>
          <Grid item>
            <ThumbUp className={classes.icon} />
          </Grid>
          <Grid item id="likes" className={classes.item}>
            <Typography className={classes.text}>0</Typography>
          </Grid>

          <Grid item>
            <ChatBubble className={classes.icon} />
          </Grid>
          <Grid item id="comments" className={classes.item}>
            <Typography className={classes.text}>0</Typography>
          </Grid>

          <Grid item id="reply" className={classes.item}>
            <ReplyDialog
              name={name}
              userID={userID}
              convoID={convoID}
            />
          </Grid>

          <Grid item id="follow" className={classes.item}>
            <StyledButton className={classes.button} variant="outlined">
              <Star style={{ color: "#dfe3f0" }} />
              <Typography className={classes.text} component="span">
                Follow
              </Typography>
            </StyledButton>
          </Grid>

          <Grid item style={{ marginRight: "10px", flex: 1 }}>
            <Typography
              className={classes.text}
              style={{
                float: "right",
                color: "#adadad" // grey
              }}
              component="span"
            >
              Listens:
            </Typography>
          </Grid>
          <Grid item id="listens" className={classes.item}>
            <Typography className={classes.text} component="span">
              0
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <React.Fragment>
      {generateHeader()}
      <Divider className={classes.divider} />
    </React.Fragment>
  );
}

export default ConversationPost;
