import { alpha, Color, createTheme, CSSInterpolation } from '@mui/material';
import { CSSProperties } from '@mui/styled-engine';
import { theme } from './base';

// main #c0392b
// secondary #2980b9

const coolGrey: Color = {
  '50': '#F5F7FA',
  '100': '#E4E7EB',
  '200': '#CBD2D9',
  '300': '#9AA5B1',
  '400': '#7B8794',
  '500': '#616E7C',
  '600': '#52606D',
  '700': '#3E4C59',
  '800': '#323F4B',
  '900': '#1F2933',
  A100: '#E4E7EB',
  A200: '#CBD2D9',
  A400: '#7B8794',
  A700: '#3E4C59',
};

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
      default: alpha(coolGrey[700], 1),
    },
    primary: {
      main: '#A54F4A', //'#c0392b',
    },
    secondary: {
      main: '#2980b9',
    },
    grey: coolGrey,
  },
  components: {
    ...theme.components,
  },
});
