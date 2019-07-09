import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={Register} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
