import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import NavBar from "../components/NavBar";
import AudioRecord from "../components/AudioRecord";
import { StyledButton } from "../themes/theme";

import axios from "axios";


const conversationStyle = theme => ({
  root: {
    marginTop: theme.spacing(5)
  },
  title: {
    fontWeight: "bold",
    fontSize: "28px"
  },
  item: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(5)
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
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

  // receive from AudioRecord component once user has recorded audio
  handleRecordedAudio = recordedBlob => {
    console.log("receive recorded blob =", recordedBlob);
    this.setState({
      blobObject: recordedBlob
    });
  };

  submitConversation = async () => {
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
      const userId = window.localStorage.getItem("id");
      const data = new FormData();
      data.append('audio', this.state.blobObject.blob);
      data.set('title', this.state.title);

      await axios
        .put(`/api/users/conversations/${userId}`, data)
        .then(response => {
          console.log(response.data);
          this.props.history.push("/profile", { id: userId });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

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
            <Typography className={classes.title}>
              Create a new conversation
            </Typography>
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

          <Grid item>
            <StyledButton
              variant="contained"
              color="secondary"
              className={classes.button}
              type="submit"
              onClick={this.submitConversation}
            >
              Create Conversation
            </StyledButton>
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
