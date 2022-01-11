import 'reflect-metadata';

import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';

import { darkTheme } from './globals/theme';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { diContext } from './infra/diContext';
import { Container } from 'inversify';
import WebIpc, { IWebIpc } from './infra/WebIpc';

import { Provider } from 'react-redux';
import { createStore } from './store';
import { Layout } from './components/layout';

const container = new Container();

container.bind<IWebIpc>(WebIpc).to(WebIpc).inSingletonScope();

const store = createStore();

const App = () => {
  const [theme] = React.useState(darkTheme);

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <diContext.Provider value={container}>
            <CssBaseline />
            <Layout />
          </diContext.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
