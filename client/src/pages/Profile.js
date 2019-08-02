import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import NavBar from "../components/NavBar";
import UserPanel from "../components/UserPanel";
import AddPost from "../components/AddPost";

import axios from "axios";
import ConversationDialog from "../components/ConversationDialog";

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
      conversations: [],
      profileID: ""
    };
  }

  async componentDidMount() {
    console.log(
      "id of logged in user from history:",
      this.props.location.state.id
    );

    // path looks like '/pathname/:id' thus we grab the id
    const profileID = this.props.location.pathname.substring(9);
    console.log("id of profile user:", profileID);
    this.setState({ profileID });

    await axios
      .get(`/api/users/${profileID}`)
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

  generateUserPosts = () => {
    const { classes } = this.props;
    const { conversations, name, username, imageUrl, profileID } = this.state;

    // if user has not created a conversation display an "add post" component
    if (conversations.length === 0) {
      return (
        <Grid item className={classes.item}>
          <AddPost id={this.props.location.state.id} />
        </Grid>
      );
    }

    const userID = this.props.location.state.id;

    // else generate the created conversations
    const posts = conversations.map(conversation => (
      <Grid item key={conversation._id} className={classes.item}>
        <ConversationDialog
          time="00:00"
          title={conversation.title}
          commentCount="0"
          conversation={conversation}
          userID={userID}
          convoID={conversation._id}
          handleConvoUpdate={convoID => this.updateConvo(convoID)}
        />
      </Grid>
    ));
    return posts;
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      username,
      location,
      description,
      imageUrl,
      profileID
    } = this.state;

    return (
      <div>
        <NavBar location={this.props.location} />
        <Container className={classes.content} maxWidth="lg">
          <div className={classes.userpanel}>
            <UserPanel
              id={profileID}
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
