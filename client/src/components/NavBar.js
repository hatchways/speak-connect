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
    margin: theme.spacing(0.5),
    textTransform: "none"
  },
  link: {
    textDecoration: "none"
  }
}));

function NavBar(props) {
  const classes = useStyles();

  function loggedInNavLinks() {
    return (
      <div>
        <Link to={"/Profile"} className={classes.link}>
          <Button color="secondary" className={classes.button}>
            Explore
          </Button>
        </Link>
        <Link to={"/Profile"} className={classes.link}>
          <Button color="secondary" className={classes.button}>
            Messages
          </Button>
        </Link>
        <Link to={"/Profile"} className={classes.link}>
          <Button color="secondary" className={classes.button}>
            Notifications
          </Button>
        </Link>
        <Link to={"/Profile"} className={classes.link}>
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
          >
            Create Conversation
          </Button>
        </Link>
        <Link to={"/Profile"} className={classes.link}>
          <Button color="secondary" className={classes.button}>
            username
          </Button>
        </Link>
      </div>
    );
  }

  function generateNavBarLinks() {
    const { pathname } = props.location;
    console.log("pathname =", pathname);

    // currently in register or login page
    if (pathname === "/" || pathname === "/login") {
      // generate link for the opposite page
      const oppositeLink = pathname === "/" ? "/login" : "/";
      const displayText = oppositeLink === "/" ? "Signup" : "Login";
      return (
        <Link to={oppositeLink}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            {displayText}
          </Button>
        </Link>
      );
    }
    // else loggedin section!
    else {
      return loggedInNavLinks();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <img src={logo} className={classes.logo} />
          <span>{generateNavBarLinks()}</span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
