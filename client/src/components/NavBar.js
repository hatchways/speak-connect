import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const useStyles = makeStyles(theme => ({
  root: {},
  logo: {
    marginRight: theme.spacing(2),
    height: "45px"
  },
  button: {
    float: "right"
  }
}));

function NavBar(props) {
  const classes = useStyles();

  function generateNavBarLinks() {
    const { pathname } = props.location;

    // single link for register and login page
    if (pathname === "/" || pathname === "/login") {
      const link = pathname === "/" ? "/login" : "/";
      const displayText = link === "/" ? "Signup" : "Login";
      return (
        <Link to={link}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            {displayText}
          </Button>
        </Link>
      );
    } else {
      // in profile section!
      // TODO
    }
  }

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <img src={logo} className={classes.logo} alt="logo" />
          <span>{generateNavBarLinks()}</span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
