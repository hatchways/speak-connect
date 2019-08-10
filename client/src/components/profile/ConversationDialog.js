import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Grid, Typography } from "@material-ui/core";
import playButton from "../../assets/play-button.png";
import commentImg from "../../assets/comment.png";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Conversation from "../conversation/Conversation";

const useStyles = makeStyles(theme => ({
  panel: {
    width: "200px",
    height: "225px",
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    borderRadius: "5px",
    "&:hover": {
      background: "#edf1ff" // blue grey
    },
    padding: theme.spacing(3)
  },
  grid: {
    width: "100%",
    height: "100%"
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
  },
  dialog: {
    background: "rgb(57, 86, 225, 0.9)"
  },
  dialogContent: {
    paddingLeft: theme.spacing(1)
    // overflow: "hidden"
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    width: "90%"
  },

  divider: {
    // make divider same size as dialog
    position: "relative",
    left: "-24px",
    width: "50vw"
  }
}));

function ConversationDialog(props) {
  const classes = useStyles();
  const { title, commentCount, conversation } = props;
  const { userID, convoID } = props;

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <Box className={classes.panel} onClick={() => setOpenDialog(true)}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          className={classes.grid}
        >
          <Grid item id="play" style={{ display: "flex" }}>
            <img src={playButton} alt="Play Button" />
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

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth={true}
        BackdropProps={{
          classes: {
            root: classes.dialog
          }
        }}
        PaperProps={{
          style: {
            minHeight: "80vh",
            // needed to play nicely with the divider
            minWidth: "782px",
            boxShadow: "none"
          }
        }}
      >
        <DialogContent>
          <div className={classes.dialogContent}>
            <Conversation
              conversation={conversation}
              userID={userID}
              convoID={convoID}
              handleConvoUpdate={convoID => props.handleConvoUpdate(convoID)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConversationDialog;
