import React, { Component } from "react";
import FeedUser from "../components/FeedUser";
import { Grid } from "@material-ui/core";

import axios from "axios";

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
                    conversations: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            this.state.conversations.map(conversation => (
                <Grid item key={conversation._id} >
                    <FeedUser
                        name={conversation.userName}
                        title={conversation.title}
                        audioURL={conversation.audio}
                    />
                </Grid>
            ))
        )
    }
}

export default Feed;
