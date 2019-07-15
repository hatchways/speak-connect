import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import defaultprofilePicture from "../assets/default-profile-pic.png";
import UserEditDialog from "./UserEditDialog";

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
    fontSize: "20px",
    fontWeight: "bold"
  },
  secondaryText: {
    color: "#adadad" // grey
  }
}));

function UserPanel(props) {
  const classes = useStyles();
  const { name, location, description } = props;

  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      alignItems="center"
    >
      <Grid item id="profilePicture" className={classes.item}>
        <img
          src={defaultprofilePicture}
          className={classes.profilePicture}
          alt="Profile pic"
        />
      </Grid>
      <Grid item id="name" className={classes.item}>
        <Typography className={classes.primaryText}>{name}</Typography>
        <Typography className={classes.secondaryText}>@{name}</Typography>
      </Grid>
      <Grid item id="location" className={classes.item}>
        <Typography style={{ fontWeight: "bold" }}>{location}</Typography>
      </Grid>
      <Grid item id="edit" className={classes.item}>
        <UserEditDialog location={location} description={description} />
      </Grid>
      <Grid item id="description" className={classes.item}>
        <Typography className={classes.secondaryText}>{description}</Typography>
      </Grid>
    </Grid>
  );
}

export default UserPanel;
