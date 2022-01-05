import { alpha, Components } from '@mui/material';
import { CoolGrey } from '../../colours';
import { theme } from '../../base';

export const MuiOutlinedInput: Components['MuiOutlinedInput'] = {
  styleOverrides: {
    input: {
      color: alpha(theme.palette.getContrastText(CoolGrey[800]), 0.8),
    },
  },
};
