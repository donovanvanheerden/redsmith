import { alpha, createTheme, CSSInterpolation } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CSSProperties } from '@mui/styled-engine';
import { theme } from './base';

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
      default: alpha(grey[800], 1),
    },
    primary: {
      main: '#c0392b',
    },
    secondary: {
      main: '#2980b9',
    },
  },
  components: {
    ...theme.components,
  },
});
