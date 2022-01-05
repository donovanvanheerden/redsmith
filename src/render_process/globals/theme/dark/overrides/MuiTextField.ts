import { Components, outlinedInputClasses } from '@mui/material';
import { theme } from '../../base';

export const MuiTextField: Components['MuiTextField'] = {
  styleOverrides: {
    root: {
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        top: `-${theme.spacing(0.5)}`,
      },
    },
  },
};
