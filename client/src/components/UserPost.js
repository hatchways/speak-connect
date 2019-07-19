import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import playButton from "../assets/play-button.png";
import commentImg from "../assets/comment.png";
import ConversationDialog from "./ConversationDialog";

const useStyles = makeStyles(theme => ({
  root: {
    width: "200px",
    height: "225px",
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    borderRadius: "5px",
    padding: theme.spacing(3)
  },
  grid: {
    width: "100%",
    height: "100%"
  },
  timeText: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#adadad", // grey
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.8)
  },
  subjectText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: theme.spacing(1)
  },
  comments: {
    display: "flex",
    marginTop: "auto" // pushes it down
  },
  commentText: {
    fontSize: "12px",
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  }
}));

function UserPost(props) {
  const classes = useStyles();
  const { time, title, commentCount } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Box className={classes.root} onClick={() => setOpenDialog(true)}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          className={classes.grid}
        >
          <Grid item id="play" style={{ display: "flex" }}>
            <img src={playButton} alt="Play Button" />

            <Typography className={classes.timeText}>{time}</Typography>
          </Grid>

          <Grid item id="subject">
            <Typography className={classes.subjectText}>{title}</Typography>
          </Grid>

          <Grid item id="comments" className={classes.comments}>
            <img src={commentImg} style={{ height: "20px" }} alt="comment" />
            <Typography className={classes.commentText}>
              {commentCount}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <ConversationDialog
        title={title}
        open={openDialog}
        handleClose={handleDialogClose}
      />
    </div>
  );
}

export default UserPost;
