import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import UserEditDialog from "./UserEditDialog";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import LocationOn from "@material-ui/icons/LocationOn";

import defaultProfilePic from "../assets/default-profile-pic.png";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "325px",
    height: "500px",
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    borderRadius: "5px",
    borderColor: theme.palette.secondary.main,
    borderTop: "6px solid",
    paddingTop: theme.spacing(3)
  },
  item: {
    margin: theme.spacing(1),
    align: "center",
    textAlign: "center"
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    maxWidth: "120px",
    maxHeight: "120px",
    minWidth: "120px",
    minHeight: "120px",

    objectFit: "cover",
    borderRadius: "50%"
  },
  primaryText: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  secondaryText: {
    color: "#adadad" // grey
  },
  unsetFieldText: {
    color: "#dbdbdb", // grey
    fontStyle: "italic"
  }
}));

function UserPanel(props) {
  const classes = useStyles();
  const { id, name, username, location, description, imageUrl } = props;

  const uploadHandler = async e => {
    const data = new FormData();
    data.append("image", e.target.files[0], e.target.files[0].name);
    await axios
      .put(`/api/users/${id}/avatar`, data)
      .then(response => {
        console.log("Uploaded picture", response.data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // if location is set display it otherwise display placeholder
  const generateLocation = () => {
    if (location) {
      return (
        <Typography style={{ fontWeight: "bold", float: "left" }}>
          {location}
        </Typography>
      );
    }
    return (
      <Typography className={classes.unsetFieldText} style={{ float: "left" }}>
        location
      </Typography>
    );
  };

  // if description is set display it otherwise display placeholder
  const generateDescription = () => {
    if (description) {
      return (
        <Typography className={classes.secondaryText}>{description}</Typography>
      );
    }
    return (
      <Typography className={classes.unsetFieldText}>description</Typography>
    );
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      alignItems="center"
    >
      <Grid item id="profilePicture">
        <img
          src={imageUrl ? imageUrl : defaultProfilePic}
          className={classes.profilePicture}
          alt="Profile pic"
        />
        <div style={{ textAlign: "center" }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="picture-upload"
            type="file"
            onChange={uploadHandler}
          />
          <label htmlFor="picture-upload">
            <IconButton color="secondary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      </Grid>
      <Grid
        item
        id="name"
        className={classes.item}
        style={{ marginTop: "0px" }}
      >
        <Typography className={classes.primaryText}>{name}</Typography>
        <Typography className={classes.secondaryText}>@{username}</Typography>
      </Grid>
      <Grid item id="location" className={classes.item}>
        <LocationOn color="secondary" style={{ float: "left" }} />
        {generateLocation()}
      </Grid>
      <Grid item id="edit" className={classes.item}>
        <UserEditDialog id={props.id} />
      </Grid>
      <Grid
        item
        id="description"
        className={classes.item}
        style={{ width: "85%" }}
      >
        {generateDescription()}
      </Grid>
    </Grid>
  );
}

export default UserPanel;
