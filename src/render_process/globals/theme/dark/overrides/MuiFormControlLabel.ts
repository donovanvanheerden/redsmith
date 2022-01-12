import { alpha, Components } from '@mui/material';
import { theme } from '../../base';

export const MuiFormControlLabel: Components['MuiFormControlLabel'] = {
  styleOverrides: {
    root: {
      color: alpha(theme.palette.common.white, 0.8),
    },
  },
};
