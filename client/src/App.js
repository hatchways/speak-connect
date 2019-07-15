import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "./App.css";

class App extends Component {

  state = {
    id: " "
  }

  getId = (id) => {
    this.setState({
      id
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path="/" exact render={routeProps => <Register {...routeProps} getId={this.getId} />} />
          <Route path="/login" component={Login} />
          <Route path="/profile" render={routeProps => <Profile {...routeProps} userId={this.state.id} />} />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }

}

export default App;
