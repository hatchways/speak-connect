import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import NavBar from "../components/NavBar";
import UserPanel from "../components/UserPanel";
import UserPost from "../components/UserPost";

const profilePageStyle = theme => ({
  content: {
    width: "100%"
  },
  userpanel: {
    width: "325px", // width of userPanel
    float: "left",
    height: "100%",
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(3)
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    width: "70%"
  },
  item: {
    //border: "1px solid red",
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

class Profile extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <NavBar location={this.props.location} />
        <Container className={classes.content} maxWidth="lg">
          <div className={classes.userpanel}>
            <UserPanel />
          </div>
          <Grid container className={classes.grid}>
            <Grid item className={classes.item}>
              <UserPost
                time="5:04"
                title="Is social media making us more narcissistic?"
                commentCount="18"
              />
            </Grid>
            <Grid item className={classes.item}>
              <UserPost
                time="3:15"
                title="What was your biggest experience of 'cultural shock' in another country?"
                commentCount="23"
              />
            </Grid>
            <Grid item className={classes.item}>
              <UserPost
                time="1:30"
                title="Should schools cancel summer vaction?"
                commentCount="9"
              />
            </Grid>
            <Grid item className={classes.item}>
              <UserPost
                time="4:10"
                title="How important is to be attractive in society?"
                commentCount="14"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(Profile);
