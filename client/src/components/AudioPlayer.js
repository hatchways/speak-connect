import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ClippPlayer from "clipp-player";

const useStyles = makeStyles(theme => ({
  player: {
    boxShadow: "0px 0px 10px 2px #f0f0f0",
    width: "400px",
    height: "80px",
    borderRadius: "5px",
    paddingRight: "80px",
    "& counter": {
      width: "50%",
      border: "1px solid red"
    },
    "& wave": {
      width: "100%",
      top: "-5px"
    }
  }
}));

function AudioPlayer(props) {
  const classes = useStyles();
  const { audioURL } = props;

  return (
    <div className={classes.player}>
      <ClippPlayer
        className={""}
        src={audioURL}
        initialDuration={0}
        btnStyle={{
          float: "none",
          color: "#FFF",
          fontSize: "12px",
          background: "#3956E1",
          borderRadius: "15px",
          padding: "13px 16px 13px 15px",
          position: "relative",
          top: "-35px"
        }}
        counterStyle={{
          width: "3%",
          fontFamily: "gilroy-medium",
          fontSize: "15px",
          fontWeight: "bold",
          color: "#adadad", // grey
          position: "relative",
          top: "-13px",
          right: "-5px"
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
          height: 70,
          hideScrollbar: false,
          normalize: true,
          partialRender: true,
          progressColor: "#3956E1",
          responsive: true,
          waveColor: "#dbdbdb" // grey
        }}
      />
    </div>
  );
}

export default AudioPlayer;
