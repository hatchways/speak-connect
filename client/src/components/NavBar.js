import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

function NavBar(props) {
  const classes = useStyles();

  function generateNavBarLinks() {
    const { pathname } = props.location;
    console.log("pathname =", pathname);

    if (pathname === "/") {
      return <Link to={"/login"}>Login</Link>;
    } else if (pathname === "/login") {
      return <Link to={"/"}>SignUp</Link>;
    } else {
      alert("NOOOO");
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            VOICE DISCUSS
          </Typography>
          <span>{generateNavBarLinks()}</span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
