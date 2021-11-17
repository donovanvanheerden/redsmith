import ElectronStore from 'electron-store';
import { Connection } from './interfaces';

interface StoreSchema {
  connections: Record<string, Connection>;
}

const initialState: StoreSchema = {
  connections: {},
};

const store = new ElectronStore<StoreSchema>({
  defaults: initialState,
});

export default store;
