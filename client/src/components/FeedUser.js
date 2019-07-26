import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import AudioPlayer from "./AudioPlayer";

const useStyles = makeStyles(theme => ({
  root: {
    width: "700px",
    height: "500px",
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    borderRadius: "5px",
    paddingTop: theme.spacing(3)
  },
  item: {
    margin: theme.spacing(1),
    align: "center",
    textAlign: "center"
  },
  primaryText: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  secondaryText: {
    color: "#adadad" // grey
  }
}));

function FeedUser(props) {
  const classes = useStyles();
  const { name, title, audioURL } = props;
  console.log("name  =", name);

  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      alignItems="center"
    >
      <Grid item id="name" className={classes.item}>
        <Typography className={classes.primaryText}>{name}</Typography>
      </Grid>

      <Grid item id="title" className={classes.item}>
        <Typography className={classes.primaryText}>{title}</Typography>
      </Grid>

      <Grid item id="audio" className={classes.item}>
        <div className={classes.player}>
          <AudioPlayer audioURL={audioURL} />
        </div>
      </Grid>
    </Grid>
  );
}

export default FeedUser;
