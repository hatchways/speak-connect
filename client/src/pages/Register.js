import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import { Router } from "react-router-dom";

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
        <h1>Welcome to Twitter Audio</h1>
        <h2> Sign up</h2>
        <form onSubmit={this.handleSubmit}>
          Name:
          <input
            type="text"
            value={userName}
            name="userName"
            onChange={this.handleChange}
          />{" "}
          <br />
          <br />
          Email:
          <input
            type="text"
            value={userEmail}
            name="userEmail"
            onChange={this.handleChange}
          />{" "}
          <br />
          <br />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}

export default withStyles(registerPageStyle)(Register);
