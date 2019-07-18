import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

import NavBar from "../components/NavBar";
import AudioRecord from "../components/AudioRecord";

const conversationStyle = theme => ({
  root: {
    marginTop: theme.spacing(5)
  },
  item: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(5),
    textTransform: "none"
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
    // backgroundColor: amber[700],
    // border: "5px solid",
    // borderColor: amber[700],
    // borderRadius: "5px",
    // marginTop: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2)
  }
});

class CreateConversation extends Component {
  state = {
    title: "",
    blobObject: null,
    errorMessage: null
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  // recieved from AudioRecord component once user has recorded audio
  handleRecordedAudio = recordedBlob => {
    console.log("recieved recorded blob =", recordedBlob);
    this.setState({
      blobObject: recordedBlob
    });

    // TODO
    // Save audio to user and amazon S3
  };

  submitConversation = () => {
    const { title, blobObject } = this.state;
    // make sure title and audio has been set
    if (title === "") {
      this.setState({
        errorMessage: "Please enter a title"
      });
    } else if (blobObject === null) {
      this.setState({
        errorMessage: "Please record audio"
      });
    } else {
      // success!
      console.log("Conversation created! (umm soon)");

      // TODO
      // Save audio to user and amazon S3
    }
  };

  render() {
    const { classes } = this.props;
    const { title, errorMessage } = this.state;
    return (
      <div>
        <NavBar location={this.props.location} />

        <Grid
          container
          className={classes.root}
          direction="column"
          alignItems="center"
        >
          <Grid item className={classes.item}>
            <Typography variant="h5">Create a new conversation</Typography>
          </Grid>

          <Grid item className={classes.item}>
            <TextField
              id="title"
              name="title"
              placeholder="Enter Title here"
              margin="normal"
              autoComplete="off"
              fullWidth
              value={title}
              onChange={this.handleTitleChange}
              inputProps={{ style: { textAlign: "center" } }}
              style={{ width: "500px" }}
            />
          </Grid>

          <Grid item>
            <AudioRecord onRecordAudio={this.handleRecordedAudio} />
          </Grid>
          {/* <Grid item className={classes.item}>
            <Typography>press to start recording</Typography>
          </Grid>
          <Grid item>
            <Typography>0:00</Typography>
          </Grid> */}
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              type="submit"
              onClick={this.submitConversation}
            >
              Create Conversation
            </Button>
            <Grid item className={classes.item}>
              {errorMessage ? (
                <div className={classes.error}>{errorMessage}</div>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(conversationStyle)(CreateConversation);
