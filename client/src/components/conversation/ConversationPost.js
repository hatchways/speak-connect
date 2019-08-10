import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import ThumbUp from "@material-ui/icons/ThumbUp";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Star from "@material-ui/icons/Star";

import { StyledButton } from "../../themes/theme";
import AudioPlayer from "../AudioPlayer";
import ReplyDialog from "./ReplyDialog";

import axios from "axios";
import UserInfoHeader from "./UserInfoHeader";
import Comments from "./Comments";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  headContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width: "90%"
  },
  item: {
    marginRight: theme.spacing(2)
  },
  unlikedIcon: {
    color: "#dfe3f0", // blue grey
    marginRight: theme.spacing(1),
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  likedIcon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
    "&:hover": {
      color: "#dfe3f0" // blue grey
    }
  },
  commentIcon: {
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
  }
}));

function ConversationPost(props) {
  const classes = useStyles();
  const {
    name,
    username,
    imageUrl,
    title,
    audio,
    comments
  } = props.conversation;

  const { userID, convoID } = props;
  const convoUserID = props.conversation.userID;

  const numLikes = Object.keys(props.conversation.userLikeMap).length;
  const numComments = comments.length;
  const isLiked = props.conversation.userLikeMap[userID];

  const handleLike = async () => {
    const data = {
      userID,
      convoID
    };

    await axios
      .put(`/api/users/${props.id}/conversations/like`, data)
      .then(response => {
        console.log("conversation successfully liked/unliked ", response.data);
        props.handleConvoUpdate(convoID);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // update convo in parent
  const handleNewComment = async () => {
    props.handleConvoUpdate(convoID);
  };

  const generateHeader = () => {
    return (
      <div>
        <UserInfoHeader
          name={name}
          username={username}
          imageUrl={imageUrl}
          userID={convoUserID}
          loggedInUserID={userID}
        />
        <Typography className={classes.title}>{title}</Typography>
        <AudioPlayer audioURL={audio} />

        <Grid container alignItems="center" className={classes.headContainer}>
          <Grid item>
            <ThumbUp
              className={isLiked ? classes.likedIcon : classes.unlikedIcon}
              onClick={() => handleLike()}
            />
          </Grid>
          <Grid item id="likes" className={classes.item}>
            <Typography className={classes.text}>{numLikes}</Typography>
          </Grid>

          <Grid item>
            <ChatBubble className={classes.commentIcon} />
          </Grid>
          <Grid item id="comments" className={classes.item}>
            <Typography className={classes.text}>{numComments}</Typography>
          </Grid>

          <Grid item id="reply" className={classes.item}>
            <ReplyDialog
              name={name}
              userID={userID}
              convoID={convoID}
              handleNewComment={handleNewComment}
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
    <div style={{ marginTop: "10px" }}>
      {generateHeader()}
      <Divider className={classes.divider} />
      <Comments
        parentUsername={username}
        comments={comments}
        loggedInUserID={userID}
      />
    </div>
  );
}

export default ConversationPost;
