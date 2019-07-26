import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateConversation from "./pages/CreateConversation";
import Feed from "./pages/Feed";


import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/create-conversation" component={CreateConversation} />
        <Route path="/feed" component={Feed} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
