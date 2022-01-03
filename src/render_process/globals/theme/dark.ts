import { alpha, createTheme, CSSInterpolation } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import { theme } from './base';

import { CoolGrey } from './colours';

// main #c0392b
// secondary #2980b9

declare module '@mui/material' {
  interface Components {
    RedConnectionSwitcher: {
      root?: CSSProperties;
    };
    RedConnectionButton: {
      defaultProps?: {
        color?: 'primary' | 'secondary';
      };
      styleOverrides?: {
        root?: CSSInterpolation;
        primary?: CSSInterpolation;
        secondary?: CSSInterpolation;
      };
    };
    RedDbSelector: {
      styleOverrides?: {
        root?: CSSInterpolation;
        title?: CSSInterpolation;
        list?: CSSInterpolation;
      };
    };
    RedDbItem: {
      defaultProps?: {
        color?: 'primary' | 'secondary';
      };
      styleOverrides?: {
        root?: CSSInterpolation;
        primary?: CSSInterpolation;
        secondary?: CSSInterpolation;
      };
    };
  }
}

// const dark = createTheme({ palette: { primary: { main: '#c0392b' }, secondary: { main: '#2980b9' } } });

export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    background: {
      default: alpha(CoolGrey[700], 1),
    },
    primary: {
      main: '#A54F4A', //'#c0392b',
    },
    secondary: {
      main: '#2980b9',
    },
    grey: CoolGrey,
  },
  components: {
    ...theme.components,
  },
});
