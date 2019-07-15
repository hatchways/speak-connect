import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

class UserEditDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }
  // const[open, setOpen] = React.useState(false);

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {

    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
          style={{ textTransform: "none", margin: "3px" }}
        >
          Edit
      </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="md">
          <DialogTitle id="editDialog">Edit Your Information</DialogTitle>
          <DialogContent>
            <TextField margin="dense" id="location" label="Location" fullWidth />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              multiline={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
      </Button>
            <Button color="secondary">
              Update
      </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }

}

export default withStyles(useStyles)(UserEditDialog);
