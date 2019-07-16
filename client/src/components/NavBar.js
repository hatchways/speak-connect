import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const useStyles = makeStyles(theme => ({
  root: {},
  logo: {
    marginTop: theme.spacing(1),
    height: "42px"
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "none"
  },
  link: {
    textDecoration: "none"
  },
  notice: {
    display: "inline-block",
    fontWeight: "bold",
    marginRight: theme.spacing(1)
  },
  appbar: {
    boxShadow: "none",
    borderBottom: "1px solid #E8E8E8"
  },
  toolbar: {
    padding: "5px",
    // center elements
    right: "0",
    left: "0",
    marginRight: "auto",
    marginLeft: "auto",
    width: "95%"
  }
}));

function NavBar(props) {
  const classes = useStyles();

  // navbar for register and login
  function registerLoginNavLinks(pathname) {
    // generate link for the opposite page
    //if on register page, add link to login and vice versa
    const oppositeLink = pathname === "/" ? "/login" : "/";


    const buttonText = pathname === "/" ? "Log in" : "Sign up";
    const noticeText =
      pathname === "/" ? "Already a member?" : "Don't have an account?";

    return (
      <div>
        <Typography className={classes.notice}>{noticeText}</Typography>
        <Link to={oppositeLink} className={classes.link}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    );
  }

  // navbar for when logged in
  function loggedInNavLinks() {

    const { username } = props
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
            {username}
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
      return registerLoginNavLinks(pathname);
    }
    // else loggedin section!
    else {
      return loggedInNavLinks();
    }
  }

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static" className={classes.appbar}>
        <Toolbar variant="regular" className={classes.toolbar}>
          <div style={{ flex: "1" }}>
            <img src={logo} className={classes.logo} alt="logo" />
          </div>

          <span>{generateNavBarLinks()}</span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
