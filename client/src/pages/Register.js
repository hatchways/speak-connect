import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { StyledButton } from "../themes/theme";

import axios from "axios";

const registerPageStyle = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  title: {
    fontWeight: "bold",
    fontSize: "30px",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1)
  },
  error: {
    color: "red"
  }
});

class Register extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    //make http post request to send name, username, email and password to server
    await axios
      .post("/api/users", userData)
      .then(response => {
        console.log("Data received: ", response.data);

        // get jwt token from header
        const token = response.headers["x-auth-token"];

        // add token, username and id to local storage
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("username", response.data.username);
        window.localStorage.setItem("userID", response.data._id);

        // test if token is stored
        const localStorageToken = window.localStorage.getItem("token");
        console.log("token from local storage = ", localStorageToken);

        //direct user to profile page
        this.props.history.push(`profile/${response.data._id}`, { id: response.data._id });
      })
      .catch(error => {
        this.setState({ errorMessage: error.response.data });
        console.log(error);
      });
  };

  handleChange = e => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "username") {
      this.setState({ username: e.target.value });
    } else if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    } else {
      this.setState({ confirmPassword: e.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      username,
      email,
      password,
      confirmPassword,
      errorMessage
    } = this.state;

    return (
      <div className={classes.landingContainer}>
        <NavBar location={this.props.location} />
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography className={classes.title}>Sign Up</Typography>
            </Grid>

            <Grid item>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                placeholder="Full Name"
                className={classes.textField}
                value={name}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                className={classes.textField}
                value={username}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                className={classes.textField}
                type="email"
                value={email}
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
                name="password"
                label="Password"
                className={classes.textField}
                value={password}
                onChange={this.handleChange}
                type="password"
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
              <StyledButton
                variant="contained"
                label="Submit"
                color="secondary"
                className={classes.button}
                type="submit"
                value="Sign up"
              >
                Sign up
              </StyledButton>
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
