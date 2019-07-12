import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import NavBar from "../components/NavBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import axios from "axios";


const loginPageStyle = theme => ({
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  }
});

class Login extends Component {
  state = {
    userEmail: "",
    userPassword: "",
    errorMessage: ""
  };
  handleSubmit = async e => {
    e.preventDefault();
    //make http request to login 
    let credentials = {
      email: this.state.userEmail,
      password: this.state.userPassword
    }
    const { data } = await axios.post("/api/auth", credentials);
    console.log("User authenticated ?", data);

    await axios
      .post("/api/auth", credentials)
      .then(response => {
        console.log("Success!!!", response.data);
        //direct user to profile page
        this.props.history.replace("/profile");
      })
      .catch(error => {
        console.log("ERROR:", error);
        this.setState({ errorMessage: error.response.data });

      });

  };

  handleChange = e => {
    if (e.target.name === "userEmail") {
      this.setState({ userEmail: e.target.value });
    } else {
      // userPassword
      this.setState({ userPassword: e.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    const { userEmail, userPassword, errorMessage } = this.state;
    return (
      <div>
        <NavBar location={this.props.location} />
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <h1>Login</h1>
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
              <Button
                variant="contained"
                label="Submit"
                color="secondary"
                className={classes.button}
                type="submit"
                value="Sign up"
              >
                Log In
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

export default withStyles(loginPageStyle)(Login);
