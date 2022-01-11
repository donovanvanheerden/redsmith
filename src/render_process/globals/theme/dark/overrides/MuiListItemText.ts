import { alpha, Components } from '@mui/material';
import { theme } from '../../base';

export const MuiListItemText: Components['MuiListItemText'] = {
  styleOverrides: {
    primary: {
      color: alpha(theme.palette.common.white, 0.8),
    },
    secondary: {
      color: alpha(theme.palette.common.white, 0.6),
    },
  },
};
