import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

interface Props {
  open: boolean;
  title: string;
  message: string;

  onClose: () => void;
  onConfirm: () => void;
}

const Confirm = ({
  title,
  message,
  onConfirm,
  ...modalProps
}: Props): JSX.Element => (
  <Dialog {...modalProps}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button variant="text" onClick={modalProps.onClose}>
        Cancel
      </Button>
      <Button color="secondary" variant="contained" onClick={onConfirm}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default Confirm;
