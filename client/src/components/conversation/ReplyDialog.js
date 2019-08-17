import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StyledButton } from "../../themes/theme";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Reply from "@material-ui/icons/Reply";
import AudioRecord from "../AudioRecord";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    background: "rgb(57, 86, 225, 0.9)" // blue
  },
  title: {
    textAlign: "center",
    marginTop: theme.spacing(3)
  },
  container: {
    textAlign: "center",
    marginBottom: theme.spacing(3)
  },
  text: {
    fontWeight: "bold",
    color: "black"
  },
  action: {
    justifyContent: "center",
    marginBottom: theme.spacing(4)
  },
  error: {
    color: "red",
    fontWeight: "bold"
  }
}));

function ReplyDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [blobObject, setBlobObject] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { name, userID, convoID } = props;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // receive from AudioRecord component once user has recorded audio
  const handleRecordedAudio = recordedBlob => {
    console.log("receive recorded blob =", recordedBlob);
    setBlobObject(recordedBlob);
  };

  async function handleSubmit() {
    console.log("blob recorded =", blobObject);
    // make sure audio is recorded
    if (blobObject === null) {
      setErrorMessage("please Record Audio");
    } else {
      const data = new FormData();
      data.append("audio", blobObject.blob);
      await axios
        .post(`/api/users/${userID}/comments/${convoID}`, data)
        .then(response => {
          console.log("Comment saved?:", response.data);
        })
        .catch(error => {
          console.log(error);
        });
      setOpen(false);
      props.handleNewComment();
    }
  }

  return (
    <div>
      <StyledButton
        className={classes.button}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <Reply style={{ color: "#dfe3f0" }} />
        <Typography className={classes.text} component="span">
          Reply
        </Typography>
      </StyledButton>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }}
        PaperProps={{
          style: {
            minHeight: "60vh",
            minWidth: "45vw",
            boxShadow: "none"
          }
        }}
      >
        <DialogTitle className={classes.title}>
          <Typography style={{ fontWeight: "bold", fontSize: "26px" }}>
            Response to {name}
          </Typography>
        </DialogTitle>

        <DialogContent className={classes.container}>
          <AudioRecord onRecordAudio={handleRecordedAudio} />
          <div className={classes.error}>{errorMessage}</div>
        </DialogContent>

        <DialogActions className={classes.action}>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReplyDialog;
