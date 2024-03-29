import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";

import NavBar from "../components/NavBar";

import axios from "axios";
import Conversation from "../components/conversation/Conversation";

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
  post: {
    width: "750px",
    minHeight: "500px",
    boxShadow: "0px 0px 30px 5px #f0f0f0",
    borderRadius: "5px",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(5)
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

  // called by child components when a conversation
  //has been updated and we need to update state
  updateConvo = async convoID => {
    console.log("update convo id = ", convoID);

    // get the conversation
    await axios
      .get(`/api/users/conversations/${convoID}`, { convoID: convoID })
      .then(response => {
        console.log("recieved convo: ", response.data);
        const updatedConvo = response.data;

        let conversations = [...this.state.conversations];
        // find index of original convo in array
        let index = conversations.findIndex(conversation => {
          return conversation._id === convoID;
        });

        // update convo array
        conversations[index] = updatedConvo;
        this.setState({ conversations });
      })
      .catch(error => {
        console.log(error);
      });
  };

  generateConversations = classes => {
    const userID = this.props.location.state.id;

    const posts = this.state.conversations.map(conversation => (
      <Grid item key={conversation._id} className={classes.item}>
        <div className={classes.post}>
          <Conversation
            conversation={conversation}
            loggedInUserID={userID}
            handleConvoUpdate={convoID => this.updateConvo(convoID)}
          />
        </div>
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
