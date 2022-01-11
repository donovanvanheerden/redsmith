import { Components } from '@mui/material';
import { theme } from '../../base';

export const MuiDialogActions: Components['MuiDialogActions'] = {
  styleOverrides: {
    root: {
      padding: theme.spacing(1, 2, 2, 1),
    },
  },
};
