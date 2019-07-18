import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StyledButton } from "../themes/theme";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    background: "rgb(57, 86, 225, 0.9)" // blue
    // background: "rgb(240, 240, 240, 0.9)" // grey
  },
  item: {
    marginBottom: theme.spacing(2)
  },
  button: {
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "14px"
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

  async function handleUpdate() {
    const jwt = window.localStorage.getItem("token");

    axios.defaults.headers = {
      "Content-Type": "application/json",
      "x-auth-token": jwt
    };

    const updates = {
      location: location,
      description: description
    };

    await axios
      .put(`/api/users/${props.id}`, updates)
      .then(response => {
        console.log("Updated data ", response.data);
      })
      .catch(error => {
        console.log(error);
      });

    window.location.reload();
  }

  return (
    <div>
      <StyledButton
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{ textTransform: "none", margin: "3px" }}
      >
        Edit
      </StyledButton>

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
          <Button
            className={classes.button}
            onClick={handleClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            onClick={handleUpdate}
            color="secondary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserEditDialog;
