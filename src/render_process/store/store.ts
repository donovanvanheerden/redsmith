/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createStore, Store } from 'redux';

import rootReducer from './root-reducer';

export function configureStore(): Store {
  const store = createStore(rootReducer);

  if (process.env.NODE_ENV !== 'production' && 'hot' in module) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (module as any).hot.accept('./root-reducer', () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
}
