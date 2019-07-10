import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Router } from "react-router-dom";
import NavBar from "../components/NavBar";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import axios from "axios";

const registerPageStyle = theme => ({
  landingContainer: {
    //margin: theme.spacing.unit * 2
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

        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel htmlFor="component-outlined">Full Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={userName}
            onChange={this.handleChange}
            labelWidth={0}
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(registerPageStyle)(Register);
