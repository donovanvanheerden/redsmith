import { Components } from '@mui/material';
import { CoolGrey } from '../../colours';

export const MuiDialog: Components['MuiDialog'] = {
  styleOverrides: {
    paper: {
      backgroundColor: CoolGrey[700],
      backgroundImage: 'unset',
    },
  },
};
