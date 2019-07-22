import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import NavBar from "../components/NavBar";
import UserPanel from "../components/UserPanel";
import UserPost from "../components/UserPost";

import axios from "axios";

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
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      location: "",
      description: "",
      imageUrl: null
    };
  }

  async componentDidMount() {
    console.log("data from history", this.props.location.state.id);

    await axios
      .get(`/api/users/${this.props.location.state.id}`)
      .then(response => {
        console.log("Data received:", response.data);
        this.setState({
          name: response.data.name,
          username: response.data.username,
          location: response.data.location,
          description: response.data.description,
          imageUrl: response.data.imageUrl
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const { name, username, location, description, imageUrl } = this.state;

    return (
      <div>
        <NavBar location={this.props.location} />
        <Container className={classes.content} maxWidth="lg">
          <div className={classes.userpanel}>
            <UserPanel
              id={this.props.location.state.id}
              name={name}
              username={username}
              location={location}
              description={description}
              imageUrl={imageUrl}
            />
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
