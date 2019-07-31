import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Container, Typography, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import ThumbUp from "@material-ui/icons/ThumbUp";
import ChatBubble from "@material-ui/icons/ChatBubble";
import Reply from "@material-ui/icons/Reply";
import Star from "@material-ui/icons/Star";

import { StyledButton } from "../themes/theme";
import AudioPlayer from "./AudioPlayer";

const useStyles = makeStyles(theme => ({
  dialog: {
    background: "rgb(57, 86, 225, 0.9)" 
  },
  root: {
    marginTop: theme.spacing(5)
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "90%"
  },
  item: {
    marginRight: theme.spacing(2)
  },
  icon: {
    color: "#dfe3f0", // blue grey
    marginRight: theme.spacing(1)
    // position: "relative",
    // top: "5px",
    // paddingRight: theme.spacing(1)
  },
  text: {
    fontWeight: "bold"
  },
  button: {
    color: "black"
  },
  divider: {
    // make divider same size as dialog
    position: "relative",
    left: "-24px",
    width: "50vw"
  }
}));

function ConversationDialog(props) {
  const classes = useStyles();
  const { title, audioURL, open } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"md"}
        BackdropProps={{
          classes: {
            root: classes.dialog
          }
        }}
        PaperProps={{
          style: {
            minHeight: "80vh",
            maxWidth: "50vw",
            boxShadow: "none"
          }
        }}
      >
        <DialogContent>
          <Container className={classes.root}>
            <Typography className={classes.title}>{title}</Typography>
            <AudioPlayer audioURL={audioURL} />
            <Grid container alignItems="center" className={classes.container}>
              <Grid item>
                <ThumbUp className={classes.icon} />
              </Grid>
              <Grid item id="likes" className={classes.item}>
                <Typography className={classes.text}>0</Typography>
              </Grid>

              <Grid item>
                <ChatBubble className={classes.icon} />
              </Grid>
              <Grid item id="comments" className={classes.item}>
                <Typography className={classes.text}>0</Typography>
              </Grid>

              <Grid item id="reply" className={classes.item}>
                <StyledButton className={classes.button} variant="outlined">
                  <Reply style={{ color: "#dfe3f0" }} />
                  <Typography className={classes.text} component="span">
                    Reply
                  </Typography>
                </StyledButton>
              </Grid>

              <Grid item id="follow" className={classes.item}>
                <StyledButton className={classes.button} variant="outlined">
                  <Star style={{ color: "#dfe3f0" }} />
                  <Typography className={classes.text} component="span">
                    Follow
                  </Typography>
                </StyledButton>
              </Grid>

              <Grid item style={{ marginRight: "10px", flex: 1 }}>
                <Typography
                  className={classes.text}
                  style={{
                    float: "right",
                    color: "#adadad" // grey
                  }}
                  component="span"
                >
                  Listens:
                </Typography>
              </Grid>
              <Grid item id="listens" className={classes.item}>
                <Typography className={classes.text} component="span">
                  0
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Divider className={classes.divider} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConversationDialog;
