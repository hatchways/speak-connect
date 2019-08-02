import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import { Typography } from "@material-ui/core";
import { StyledButton } from "../themes/theme";

const loginPageStyle = theme => ({
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

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMessage: ""
  };
  handleSubmit = async e => {
    e.preventDefault();
    //make http request to login
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    await axios
      .post("/api/auth", credentials)
      .then(response => {
        console.log(response.data);

        // get jwt token from header
        const token = response.headers["x-auth-token"];

        // add token,user id and username to local storage
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
        console.log("ERROR:", error);
        this.setState({ errorMessage: "Incorrect Username or Password" });
      });
  };
  handleChange = e => {
    if (e.target.name === "username") {
      this.setState({ username: e.target.value });
    } else {
      // password
      this.setState({ password: e.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    const { username, password, errorMessage } = this.state;
    return (
      <div>
        <NavBar location={this.props.location} />
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography className={classes.title}>Login</Typography>
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
                id="password"
                name="password"
                label="Password"
                className={classes.textField}
                value={password}
                onChange={this.handleChange}
                type="password"
                autoComplete="current-password"
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
                Log in
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

export default withStyles(loginPageStyle)(Login);
