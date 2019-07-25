import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  root: {
    background: "rgb(57, 86, 225, 0.9)"
  },
  item: {
    marginBottom: theme.spacing(2)
  }
}));

function ConversationDialog(props) {
  const classes = useStyles();
  const { title, open } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"md"}
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }}
      >
        <DialogTitle id="editDialog" style={{ textAlign: "center" }}>
          {title}
        </DialogTitle>
        <DialogContent />

        <DialogActions />
      </Dialog>
    </div>
  );
}

export default ConversationDialog;
