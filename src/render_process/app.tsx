import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './pages/Main';

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Main />
  </ThemeProvider>
);

function render() {
  ReactDOM.render(<App />, document.getElementById('app'));
}

render();
