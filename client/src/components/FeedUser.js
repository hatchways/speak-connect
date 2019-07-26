import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ClippPlayer from "clipp-player";

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
  },

  player: {
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    width: "470px",
    height: "80px",
    borderRadius: "5px",
    ".wave": {
      background: "red"
    }
  }
}));

function FeedUser(props) {
  const classes = useStyles();
  const { name, title, audioURL } = props;

  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      alignItems="center"
    >
      <Grid
        item
        id="name"
        className={classes.item}
        style={{ marginTop: "0px" }}
      >
        <Typography className={classes.primaryText}>{name}</Typography>
      </Grid>

      <Grid
        item
        id="title"
        className={classes.item}
        style={{ marginTop: "0px" }}
      >
        <Typography className={classes.primaryText}>{title}</Typography>
      </Grid>

      <Grid
        item
        id="audio"
        className={classes.item}
        style={{ marginTop: "0px" }}
      >
        <div className={classes.player}>
          <ClippPlayer
            className={""}
            src={audioURL}
            initialDuration={0}
            btnStyle={{
              float: "none",
              color: "#FFF",
              background: "#3956E1",
              borderRadius: "15px",
              padding: "12px 15px",
              position: "relative",
              top: "-36px"
            }}
            counterStyle={{
              width: "3%",
              fontFamily: "gilroy-medium",
              fontSize: "15px",
              fontWeight: "bold",
              marginTop: "15px",
              color: "#adadad" // grey
            }}
            volume={1}
            zoom={1}
            options={{
              audioRate: 1,
              autoCenter: true,
              barGap: 1,
              barWidth: 3,
              barHeight: 5,
              cursorColor: "#FFF",
              cursorWidth: 1,
              fillParent: true,
              height: 75,
              hideScrollbar: false,
              normalize: true,
              partialRender: true,
              progressColor: "#3956E1",
              responsive: true,
              waveColor: "#dbdbdb" // grey
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default FeedUser;
