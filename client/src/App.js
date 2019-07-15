import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "./App.css";

function App(props) {

  const [id, setId] = useState(" ");

  const getId = id => {
    setId(id);

    //direct user to profile page
    props.history.replace("/profile");


  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact render={routeProps => <Register {...routeProps} getId={getId} />} />
        <Route path="/login" render={routeProps => <  Login {...routeProps} getId={getId} />} />
        <Route path="/profile" render={routeProps => <Profile {...routeProps} userId={id} />} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
