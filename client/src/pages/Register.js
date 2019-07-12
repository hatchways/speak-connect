import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

const registerPageStyle = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    color: "white",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textTransform: "none"
  },
  error: {
    color: "red"
  }
});

class Register extends Component {
  state = {
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    errorMessage: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const userData = {
      name: this.state.userName,
      email: this.state.userEmail,
      password: this.state.userPassword,
      confirmPassword: this.state.confirmPassword
    };
    //make http post request to send name,email and password to server

    await axios
      .post("/api/users", userData)
      .then(response => {
        console.log("success! Data received = ", response.data);
        //direct user to profile page
        this.props.history.replace("/profile");
      })
      .catch(error => {
        console.log("ERROR = ", error.response.data);
        this.setState({ errorMessage: error.response.data });
      });
  };

  handleChange = e => {
    if (e.target.name === "userName") {
      this.setState({ userName: e.target.value });
    } else if (e.target.name === "userEmail") {
      this.setState({ userEmail: e.target.value });
    } else if (e.target.name === "userPassword") {
      this.setState({ userPassword: e.target.value });
    } else {
      this.setState({ confirmPassword: e.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      userName,
      userEmail,
      userPassword,
      confirmPassword,
      errorMessage
    } = this.state;

    return (
      <div className={classes.landingContainer}>
        <NavBar location={this.props.location} />
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <h1>Sign Up</h1>
            </Grid>

            <Grid item>
              <TextField
                required
                id="name"
                name="userName"
                label="Name"
                placeholder="Full Name"
                className={classes.textField}
                value={userName}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id="email"
                name="userEmail"
                label="Email"
                className={classes.textField}
                type="email"
                value={userEmail}
                onChange={this.handleChange}
                autoComplete="email"
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id="password"
                name="userPassword"
                label="Password"
                className={classes.textField}
                value={userPassword}
                onChange={this.handleChange}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                className={classes.textField}
                value={confirmPassword}
                onChange={this.handleChange}
                type="password"
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                label="Submit"
                color="secondary"
                className={classes.button}
                type="submit"
                value="Sign up"
              >
                Sign up
              </Button>
            </Grid>
            <Grid item className={classes.error}>
              {errorMessage}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(registerPageStyle)(Register);
