import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Mic from "@material-ui/icons/Mic";
import Stop from "@material-ui/icons/Stop";

import { ReactMic } from "react-mic";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0px"
  },
  button: {
    padding: theme.spacing(3.5),
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark
    },
    // position button overtop sineWave
    position: "absolute",
    marginLeft: "-195px",
    marginTop: "55px",
    zIndex: "2"
  },
  soundWave: {
    padding: "0px",
    margin: "0px"
  }
}));

function AudioRecord(props) {
  const [blobURL, setBlobURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const classes = useStyles();

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = recordedBlob => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = recordedBlob => {
    setBlobURL(recordedBlob.blobURL);
    props.onRecordAudio(recordedBlob);
  };

  const recordButton = () => {
    return (
      <IconButton
        onClick={startRecording}
        className={classes.button}
        color="primary"
      >
        <Mic fontSize="large" />
      </IconButton>
    );
  };

  const stopButton = () => {
    return (
      <IconButton
        onClick={stopRecording}
        className={classes.button}
        color="primary"
      >
        <Stop fontSize="large" />
      </IconButton>
    );
  };

  return (
    <div className={classes.root}>
      <Container>
        <div>
          <ReactMic
            record={isRecording}
            className={classes.soundWave}
            visualSetting="frequencyCircles" // sinewave, frequencyCircles or frequencyBars
            width={300}
            height={200}
            onStop={onStop}
            onData={onData}
            strokeColor="#3956E1"
            backgroundColor="#ffffff"
          />
          {isRecording ? stopButton() : recordButton()}
        </div>
        <div>
          <audio controls src={blobURL} />
        </div>
      </Container>
    </div>
  );
}

export default AudioRecord;
