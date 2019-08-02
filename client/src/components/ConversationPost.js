import React from "react";
import { Link } from "react-router-dom";
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

import axios from "axios";

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
  headContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width: "90%"
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
      textDecoration: "none",
    }
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
  const convoUserID = props.conversation.userID;

  const { userID, convoID } = props;

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

  const generateUserInfo = (_name, _username, _imageUrl, _convoUserID) => {
    return (

      <Grid container alignItems="center">
        <Grid item id="profilePicture">
          <img
            src={_imageUrl ? _imageUrl : defaultProfilePic}
            className={classes.profilePicture}
            alt="Profile pic"
          />
        </Grid>
        <Grid item id="name" style={{ marginRight: "8px" }}>
          <Typography className={classes.primaryText}>{_name}</Typography>
        </Grid>
        <Grid item id="username">
          {/* create a link to the conversation user's profile page */}
          <Link
            to={{
              pathname: `/profile/${_convoUserID}`,
              state: { id: userID }
            }}
            className={classes.link}
          >
            <Typography className={classes.secondaryText}>
              @{_username}
            </Typography>
          </Link>

        </Grid>
      </Grid>
    );
  };

  const generateHeader = () => {
    return (
      <div>
        {generateUserInfo(name, username, imageUrl, convoUserID)}
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

  const generateComments = () => {
    // loop through and create the comments
    const commentComponents = comments.map(comment => (
      <Grid item key={comment._id} className={classes.comment}>
        {generateUserInfo(
          comment.author.name,
          comment.author.username,
          comment.author.imageUrl,
          comment.author._id
        )}
        {/* <Typography
          className={classes.secondaryText}
          style={{ marginLeft: "65px" }}
        >
          replying to @{parentUsername}
        </Typography> */}
        <div style={{ marginLeft: "65px" }}>
          <AudioPlayer audioURL={comment.audio} />
        </div>
      </Grid>
    ));

    return (
      <Grid container alignItems="center" className={classes.commentsContainer}>
        {commentComponents}
      </Grid>
    );
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {generateHeader()}
      <Divider className={classes.divider} />
      {generateComments()}
    </div>
  );
}

export default ConversationPost;
