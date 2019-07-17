import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import NavBar from "../components/NavBar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography, IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import recordButton from "../assets/record-button.png";

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
  }
});

class CreateConversation extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    console.log(this.props.location);
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

          <Grid item xs={12} className={classes.item}>
            <TextField
              id="title"
              name="title"
              placeholder="Enter Title here"
              margin="normal"
              fullWidth
              inputProps={{ style: { textAlign: "center" } }}
              style={{ width: "500px" }}
            />
          </Grid>

          <Grid item className={classes.item}>
            <IconButton color="secondary">
              <img src={recordButton} alt="record" />
            </IconButton>
          </Grid>
          <Grid item className={classes.item}>
            <Typography>press to start recording</Typography>
          </Grid>
          <Grid item>
            <Typography>0:00</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              type="submit"
            >
              Create Conversation
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(conversationStyle)(CreateConversation);
