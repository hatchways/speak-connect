import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles(theme => ({
  root: {
    background: "rgb(57, 86, 225, 0.9)" // blue
    // background: "rgb(240, 240, 240, 0.9)" // grey
  },
  item: {
    marginTop: theme.spacing(2)
  }
}));

function UserEditDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  function handleClickOpen() {
    setLocation(props.location);
    setDescription(props.description);
    setPicture(null);

    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleUpdate() {
    // TODO: HTTP put to update info
    if (location !== props.location) {
      // update location
      console.log("updated location = ", location);
    }
    if (description !== props.description) {
      // update description
      console.log("updated location = ", description);
    }
    if (picture !== null) {
      // update profiel pic
      console.log("updated location = ", picture);
    }

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

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }}
      >
        <DialogTitle id="editDialog">Edit Your Information</DialogTitle>
        <DialogContent>
          <TextField
            id="location"
            label="Location"
            className={classes.item}
            fullWidth
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <TextField
            id="description"
            label="Description"
            className={classes.item}
            fullWidth
            multiline={true}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className={classes.item}>
            <DialogContentText component="span">
              Profile Picture
            </DialogContentText>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="picture-upload"
              type="file"
              onChange={e => setPicture(e.target.files[0])}
            />
            <label htmlFor="picture-upload">
              <IconButton color="secondary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <DialogContentText component="span">
              {picture ? picture.name : ""}
            </DialogContentText>
          </div>
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

export default UserEditDialog;
