import { Components } from '@mui/material';
import { CoolGrey } from '../../colours';

export const MuiPopover: Components['MuiPopover'] = {
  styleOverrides: {
    paper: {
      backgroundColor: CoolGrey[800],
      backgroundImage: 'unset',
    },
  },
};
