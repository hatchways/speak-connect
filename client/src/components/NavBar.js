import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
  },
  logo: {
    marginRight: theme.spacing(2),
    height: "45px"
  }
}));

function NavBar(props) {
  const classes = useStyles();

  function generateNavBarLinks() {
    const { pathname } = props.location;
    console.log("pathname =", pathname);

    // links based on current location
    if (pathname === "/") {
      return <Link to={"/login"}>Login</Link>;
    } else if (pathname === "/login") {
      return <Link to={"/"}>SignUp</Link>;
    } else {
      // in profile section!
      // TODO
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="regular">
          <img src={logo} className={classes.logo} />
          <span>{generateNavBarLinks()}</span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
