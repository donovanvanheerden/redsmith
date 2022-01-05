import { alpha, Components } from '@mui/material';
import { theme } from '../../base';

export const MuiDialogTitle: Components['MuiDialogTitle'] = {
  styleOverrides: {
    root: {
      color: alpha(theme.palette.common.white, 0.8),
    },
  },
};
