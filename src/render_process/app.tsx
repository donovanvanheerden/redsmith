import 'reflect-metadata';

import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './pages/Main';
import { diContext } from './infra/diContext';
import { Container } from 'inversify';
import WebIpc, { IWebIpc } from './infra/WebIpc';

const theme = createTheme();

const container = new Container();

container.bind<IWebIpc>(WebIpc).to(WebIpc).inSingletonScope();

const App = () => (
  <ThemeProvider theme={theme}>
    <diContext.Provider value={container}>
      <CssBaseline />
      <Main />
    </diContext.Provider>
  </ThemeProvider>
);

function render() {
  ReactDOM.render(<App />, document.getElementById('app'));
}

render();
