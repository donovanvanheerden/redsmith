import { alpha, Components, menuItemClasses } from '@mui/material';
import { CoolGrey } from '../../colours';
import { theme } from '../../base';

export const MuiMenuItem: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      color: alpha(theme.palette.getContrastText(CoolGrey[800]), 0.6),
      [`&.${menuItemClasses.selected}`]: {
        backgroundColor: CoolGrey[700],
        color: theme.palette.getContrastText(CoolGrey[800]),
        '&:hover': {
          backgroundColor: alpha(CoolGrey[700], 0.6),
        },
      },
    },
  },
};
