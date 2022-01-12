import ElectronStore from 'electron-store';
import { Connection, Settings } from './interfaces';

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
});

export default store;
