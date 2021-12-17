import { createTheme, ThemeOptions } from '@mui/material';
// import { grey } from '@mui/material/colors';
import { theme } from './base';

// main #e74c3c
// secondary #3498db

// const light = createTheme({ palette: { primary: { main: '#e74c3c' }, secondary: { main: '#3498db' } } });

export const lightTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      main: '#e74c3c',
    },
    secondary: {
      main: '#3498db',
    },
  },
} as ThemeOptions);
