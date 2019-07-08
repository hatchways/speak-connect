import React, { Component } from "react";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";

import axios from "axios";

const landinPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2
  }
});

class LandingPage extends Component {
  state = {
    welcomeMessage: " "

  };

  componentDidMount() {

    axios.get('/api')
      .then(response => console.log('response from server', response.data))
      .catch(error => console.log(error))
  }

  render() {

    return (
      <div className={classes.landingContainer}>
        <Typography>{this.state.welcomeMessage}</Typography>
      </div>
    );
  }
}

export default withStyles(landinPageStyle)(LandingPage);
