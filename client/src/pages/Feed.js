import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";

import FeedUser from "../components/FeedUser";
import NavBar from "../components/NavBar";

import axios from "axios";

const useStyles = theme => ({
  container: {
    marginTop: theme.spacing(5)
  },
  title: {
    fontWeight: "bold",
    fontSize: "28px"
  },
  item: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(5)
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
  }
});

class Feed extends Component {
  state = {
    conversations: []
  };

  async componentDidMount() {
    await axios
      .get(`/api/users/conversations`)
      .then(response => {
        console.log("conversations feed:", response.data);
        this.setState({
          conversations: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateConversations = classes => {
    const posts = this.state.conversations.map(conversation => (
      <Grid item key={conversation._id} className={classes.item}>
        <FeedUser
          title={conversation.title}
          audioURL={conversation.audio}
          name={conversation.name}
          username={conversation.username}
          imageUrl={conversation.imageUrl}
          numLikes={Object.keys(conversation.userLikeMap).length}
          userID={this.props.location.state.id}
          convoID={conversation._id}
        />
      </Grid>
    ));
    return posts;
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar location={this.props.location} />
        <Container className={classes.container}>
          <Grid container className={classes.grid}>
            {this.generateConversations(classes)}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Feed);
