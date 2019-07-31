import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import NavBar from "../components/NavBar";
import UserPanel from "../components/UserPanel";
import UserPost from "../components/UserPost";
import AddPost from "../components/AddPost";

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
      imageUrl: "",
      conversations: []
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
          imageUrl: response.data.imageUrl,
          conversations: response.data.conversations
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateUserPosts = () => {
    const { classes } = this.props;
    const { conversations, name, username, imageUrl } = this.state;

    // if user has not created a conversation display an "add post" component
    if (conversations.length === 0) {
      return (
        <Grid item className={classes.item}>
          <AddPost id={this.props.location.state.id} />
        </Grid>
      );
    }

    // else generate the created conversations
    const posts = conversations.map(conversation => (
      <Grid item key={conversation._id} className={classes.item}>
        <UserPost
          name={name}
          username={username}
          imageUrl={imageUrl}
          time="00:00"
          title={conversation.title}
          commentCount="0"
          audioURL={conversation.audio} // s3 audio link
          userID={this.props.location.state.id}
          convoID={conversation._id}
        />
      </Grid>
    ));
    return posts;
  };

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
            {this.generateUserPosts()}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(Profile);
