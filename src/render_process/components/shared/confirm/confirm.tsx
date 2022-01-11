import { alpha, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  title: string;
  message: string;

  onClose: () => void;
  onConfirm: () => void;
}

const Confirm = ({ title, message, onConfirm, ...modalProps }: Props): JSX.Element => {
  const { palette } = useTheme();

  const contrastText = palette.getContrastText(palette.grey[800]);
  const fontColour = alpha(contrastText, 0.8);

  return (
    <Dialog {...modalProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ color: fontColour }}>{message}</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={modalProps.onClose}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
