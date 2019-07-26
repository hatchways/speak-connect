import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ClippPlayer from "clipp-player";

const useStyles = makeStyles(theme => ({
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
  );
}

export default AudioPlayer;
