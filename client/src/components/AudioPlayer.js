import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ClippPlayer from "clipp-player";

const useStyles = makeStyles(theme => ({
  player: {
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    width: "300px",
    height: "120px",
    borderRadius: "5px"
  }
}));

function AudioPlayer(props) {
  const classes = useStyles();
  const { blobURL } = props;

  return (
    <div className={classes.player}>
      <ClippPlayer
        className={""}
        src={blobURL}
        initialDuration={0}
        btnStyle={{
          color: "#FFF",
          background: "#3956E1",
          borderRadius: "15px",
          padding: "12px 15px"
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
          height: 100,
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
