import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Router } from "react-router-dom";
import NavBar from "../components/NavBar";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import axios from "axios";

const registerPageStyle = theme => ({
  landingContainer: {
    //margin: theme.spacing.unit * 2
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

class Register extends Component {
  state = {
    userName: " ",
    userEmail: " "
  };

  //componentDidMount() {

  // axios.get("api/users").then(res => console.log(res));
  //}

  /*
  <form onSubmit={this.handleSubmit}>
  Name:
  <input
    type="text"
    value={userName}
    name="userName"
    onChange={this.handleChange}
  />
  <br />
  <br />
  Email:
  <input
    type="text"
    value={userEmail}
    name="userEmail"
    onChange={this.handleChange}
  />
  <br />
  <br />
  <input type="submit" value="Sign up" />
</form>
*/

  handleSubmit = async e => {
    e.preventDefault();
    let userData = {
      name: this.state.userName,
      email: this.state.userEmail
    };
    //make http post request to send name and email to server
    await axios
      .post("/api/users", userData)
      .then(res => console.log("http result", res))
      .catch(err => console.log(err));

    //clear input fields
    this.setState({
      userName: " ",
      userEmail: " "
    });

    //direct user to profile page

    this.props.history.replace("/profile");
  };

  handleChange = e => {
    if (e.target.name == "userName") {
      this.setState({ userName: e.target.value });
    } else {
      this.setState({ userEmail: e.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    const { userName, userEmail } = this.state;

    return (
      <div className={classes.landingContainer}>
        <NavBar location={this.props.location} />
        <h1>Sign Up</h1>

        <form className={classes.container} onSubmit={this.handleSubmit}>
          <TextField
            id="outlined-name"
            name="userName"
            label="Name"
            placeholder="Placeholder"
            className={classes.textField}
            value={userName}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-email-input"
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
          <Button
            variant="contained"
            label="Submit"
            type="submit"
            value="Sign up"
          >
            Signup
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(registerPageStyle)(Register);
