import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  title: string;
  oldName: string;

  onClose: () => void;
  onConfirm: (newName: string) => void;
}

const RenameKey = ({ title, oldName, onConfirm, ...modalProps }: Props): JSX.Element => {
  const [newName, setName] = React.useState(oldName);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const { value } = event.target;

    setName(value);
  };

  const handleConfirm = () => onConfirm(newName);

  return (
    <Dialog {...modalProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField onChange={handleChange} value={newName} />
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

export default RenameKey;
