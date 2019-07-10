import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Router } from "react-router-dom";

import axios from "axios";

const registerPageStyle = theme => ({
  landingContainer: {
    margin: theme.spacing.unit * 2
  }
});

class Register extends Component {
  state = {
    userName: " ",
    userEmail: " ",
    userPassword: " ",
    confirmPassword: " "

  };


  handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: this.state.userName,
      email: this.state.userEmail,
      password: this.state.userPassword,
      confirmPassword: this.state.confirmPassword
    }
    //make http post request to send name,email and password to server
    const { data } = await axios.post("/api/users", userData)
    console.log("new user info:", data);
    //clear input fields
    this.setState({
      userName: " ",
      userEmail: " ",
      userPassword: "",
      confirmPassword: " "
    })

    //direct user to profile page
    this.props.history.replace("/profile")
  }

  handleChange = (e) => {

    if (e.target.name === "userName") {
      this.setState({ userName: e.target.value })
    }
    else if (e.target.name === "userEmail") {
      this.setState({ userEmail: e.target.value })
    }

    else if (e.target.name === "userPassword") {
      this.setState({ userPassword: e.target.value })
    }

    else {
      this.setState({ confirmPassword: e.target.value })
    }

  }
  render() {

    const { classes } = this.props;
    const { userName, userEmail, userPassword, confirmPassword } = this.state

    return (
      <div className={classes.landingContainer}>
        <h1>Welcome to Twitter Audio</h1>
        <h2> Sign up</h2>
        <form onSubmit={this.handleSubmit}>
          Name <br />
          <input type="text" value={userName} name="userName" onChange={this.handleChange} /> <br /><br />
          Email <br />
          <input type="text" value={userEmail} name="userEmail" onChange={this.handleChange} /> <br /><br />
          Password<br />
          <input type="text" value={userPassword} name="userPassword" onChange={this.handleChange} /> <br /><br />
          Confirm Password<br />
          <input type="text" value={confirmPassword} name="confirmPassword" onChange={this.handleChange} /> <br /><br />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}

export default withStyles(registerPageStyle)(Register);
