import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(theme => ({
  root: {
    width: "200px",
    height: "225px",
    backgroundColor: "#fafafa",
    // boxShadow: "0px 0px 30px 5px #f0f0f0",
    borderRadius: "5px",
    borderStyle: "dashed",
    borderColor: "#e6e6e6", // grey
    borderWidth: "3px",
    align: "center",
    textAlign: "center",
    padding: theme.spacing(3)
  },
  item: {
    margin: theme.spacing(1)
  },
  icon: {
    width: 100,
    height: 100,
    color: "#e6e6e6"
  },
  text: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#e6e6e6"
  }
}));

// card on profile page for when user has not made a post yet
function AddPost(props) {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.root}>
        <Grid container direction="column" className={classes.grid} />
        <Grid item>
          <Link
            to={{
              pathname: "/create-conversation",
              state: { id: props.id }
            }}
          >
            <IconButton>
              <AddBox className={classes.icon} />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <Typography className={classes.text}>Create</Typography>
        </Grid>
      </Box>
    </div>
  );
}

export default AddPost;
