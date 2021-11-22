import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';

export function createStore() {
  const store = configureStore({
    reducer: rootReducer,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
