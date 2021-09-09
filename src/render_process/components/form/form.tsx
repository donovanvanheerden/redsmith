import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../store/reducers/form-slice";

// interface Props {
//   className?: string;
//   title: string;
// }

interface FormState {
  showConnForm: boolean;
}

export default function form() {
  // const [open, setOpen] = React.useState(false);

  const { showConnForm } = useSelector<RootState, FormState>((state) => ({
    showConnForm: state.form.showConnectionForm,
  }));

  const dispatch = useDispatch();

  // const handleClickOpen = () => {
  //   // setOpen(true);
  // };

  const handleClose = () => {
    // setOpen(false);
    dispatch(formActions.showForm({ showConnectionForm: false }));
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={showConnForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Connection</DialogTitle>
        {/* <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Active" />
          <Tab label="Disabled" disabled />
          <Tab label="Active" />
        </Tabs> */}
        <DialogContent>
          <TextField id="standard-basic" label="Name" /> <br />
          <TextField id="standard-basic" label="Address" /> <br />
          <TextField id="standard-basic" label="Namespace" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
