import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React from 'react';

interface Props {
  open: boolean;
  title: string;

  onClose: () => void;
  onConfirm: (expiry: number) => void;
}

const ExpireKey = ({ title, onConfirm, ...modalProps }: Props): JSX.Element => {
  const [expiry, setExpiry] = React.useState(null);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const { value } = event.target;

    setExpiry(value);
  };

  const handleConfirm = () => {
    const newExpiry = parseInt(expiry);

    if (isNaN(newExpiry)) onConfirm(0);
    else onConfirm(newExpiry);
  };

  return (
    <Dialog {...modalProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleChange}
          placeholder="Expiry in Seconds"
          value={expiry}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={modalProps.onClose}>
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpireKey;
