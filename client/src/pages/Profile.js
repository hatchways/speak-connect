import React, { Component } from "react";
import NavBar from "../components/NavBar";
class Profile extends Component {
  render() {
    return <NavBar location={this.props.location} />;
  }
}

export default Profile;
