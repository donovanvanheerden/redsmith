import {
  alpha,
  //   buttonBaseClasses,
  createTheme,
  CSSInterpolation,
  //   iconButtonClasses,
  //   typographyClasses,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { CSSProperties } from '@mui/styled-engine';
// import redConnectionButtonClasses from '../../components/connectionSwitcher/connectionBlock/connectionBlockClasses';
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
    RedConnectionButton: {
      //   defaultProps: {
      //     color: 'secondary',
      //   },
      // styleOverrides: {
      //   root: {
      //     color: dark.palette.secondary.main,
      //     '&.Mui-active': {
      //       borderColor: dark.palette.secondary.main,
      //       '&:hover': {
      //         borderColor: dark.palette.secondary.light,
      //       },
      //     },
      //   },
      // },
    },
    RedDbSelector: {
      // styleOverrides: {
      //   root: {
      //     backgroundColor: 'purple',
      //   },
      //   title: {
      //     color: 'cyan',
      //     textAlign: 'right',
      //   },
      //   list: {
      //     border: '1px solid lightblue',
      //   },
      // },
    },
    RedDbItem: {
      // defaultProps: {
      //   color: 'secondary',
      // },
      // styleOverrides: {
      //   primary: {
      //     '&.Mui-selected .MuiListItemText-primary': {
      //       color: 'cyan',
      //     },
      //   },
      // },
    },
  },
});
