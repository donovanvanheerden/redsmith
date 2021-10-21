import 'reflect-metadata';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './pages/Main';
import { diContext } from './infra/diContext';
import { Container } from 'inversify';
import WebIpc, { IWebIpc } from './infra/WebIpc';

import { Provider } from 'react-redux';
import { configureStore } from './store';

const theme = createTheme();

const container = new Container();

container.bind<IWebIpc>(WebIpc).to(WebIpc).inSingletonScope();

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <diContext.Provider value={container}>
        <CssBaseline />
        <Main />
      </diContext.Provider>
    </ThemeProvider>
  </Provider>
);

function render() {
  ReactDOM.render(<App />, document.getElementById('app'));
}

render();
