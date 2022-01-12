import { alpha, Components } from '@mui/material';
import { theme } from '../../base';

export const MuiButton: Components['MuiButton'] = {
  styleOverrides: {
    text: {
      color: alpha(theme.palette.common.white, 0.6),
    },
  },
};
