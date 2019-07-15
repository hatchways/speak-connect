import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({}));
function UserEditDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleUpdate() {
    // TODO: HTTP puts to update info

    handleClose();
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{ textTransform: "none", margin: "3px" }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle id="editDialog">Edit Your Information</DialogTitle>
        <DialogContent>
          <TextField margin="dense" id="location" label="Location" fullWidth />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(useStyles)(UserEditDialog);
