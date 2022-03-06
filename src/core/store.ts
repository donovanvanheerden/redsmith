import ElectronStore from 'electron-store';
import { Connection, Settings } from './interfaces';
import logger from 'electron-log';

interface StoreSchema {
  connections: Record<string, Connection>;
  settings: Settings;
}

const initialState: StoreSchema = {
  connections: {},
  settings: {
    autoFormat: true,
    preferredLanguage: 'text',
  },
};

const store = new ElectronStore<StoreSchema>({
  defaults: initialState,
  migrations: {
    '0.3.0': (store) => {
      logger.info('applying `0.3.0` migration');

      const connections = store.get('connections');

      const newConnections = Object.keys(connections).reduce((prev, connectionKey) => {
        const connection = connections[connectionKey];
        return { ...prev, [connectionKey]: { ...connection, namespace: ':' } };
      }, {});

      store.set('connections', newConnections);

      logger.info('applied `0.3.0`');
    },
  },
});

export default store;
