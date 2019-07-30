import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import ConversationPost from "./ConversationPost";

const useStyles = makeStyles(theme => ({
  dialog: {
    background: "rgb(57, 86, 225, 0.9)" // blue
    // background: "rgb(240, 240, 240, 0.9)" // grey
  },
  root: {
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
  const { name, username, imageUrl, title, audioURL, open } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.handleClose}
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
            maxWidth: "782px",
            boxShadow: "none"
          }
        }}
      >
        <DialogContent>
          <div className={classes.root}>
            <ConversationPost
              name={name}
              username={username}
              imageUrl={imageUrl}
              title={title}
              audioURL={audioURL}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConversationDialog;
