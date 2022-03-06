import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DbInfo, Connection } from '../../../core/interfaces';
import { connectionActions } from './connection-slice';

interface RedisState {
  dbs: DbInfo[];
  selectedDb: number;
  keys: string[];
  selectedKeys?: string[];
  value?: string;
  name?: string;
  namespaceSelection?: string;
}

const initialState: RedisState = {
  dbs: [],
  selectedDb: 0,
  keys: [],
  selectedKeys: [],
  value: null,
  name: null,
};

interface SwitchDb {
  keys: string[];
  selectedDb: number;
}

export const redisSlice = createSlice({
  name: 'redis',
  initialState: initialState,
  reducers: {
    setOnConnected: (_, action: PayloadAction<RedisState>) => {
      return action.payload;
    },
    disconnect: () => {
      return initialState;
    },
    switchDb: (state, action: PayloadAction<SwitchDb>) => {
      const dbs = [...state.dbs];
      const idx = dbs.findIndex((d) => d.index === action.payload.selectedDb);

      if (dbs[idx].keys != action.payload.keys.length) {
        dbs.splice(idx, 1, { ...dbs[idx], keys: action.payload.keys.length });
      }

      return {
        ...state,
        dbs,
        selectedKey: null,
        value: null,
        ...action.payload,
      };
    },
    addRedisKeySelection: (state, action: PayloadAction<{ key: string }>) => {
      return {
        ...state,
        selectedKeys: [...state.selectedKeys, action.payload.key],
      };
    },
    setRedisKeySelection: (state, action: PayloadAction<{ key: string; value: string }>) => {
      return {
        ...state,
        selectedKeys: [action.payload.key],
        value: action.payload.value,
      };
    },
    removeKey: (state, action: PayloadAction<string>) => {
      const keys = [...state.keys].filter((key) => key !== action.payload);

      const dbs = [...state.dbs];
      const dIdx = dbs.findIndex((d) => d.index === state.selectedDb);

      if (dbs[dIdx].keys != keys.length) {
        dbs.splice(dIdx, 1, { ...dbs[dIdx], keys: keys.length });
      }

      if (state.selectedKeys.includes(action.payload)) {
        const value = state.selectedKeys.length === 1 ? null : state.value;

        return {
          ...state,
          dbs,
          keys,
          selectedKeys: [...state.selectedKeys.filter((k) => k !== action.payload)],
          value,
        };
      }

      return { ...state, dbs, keys };
    },
    filterKeys: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        keys: action.payload,
      };
    },
    renameKey: (state, action: PayloadAction<{ oldName: string; newName: string }>) => {
      const { oldName, newName } = action.payload;

      const keyIdx = state.keys.findIndex((k) => k === oldName);

      const modifiedKeys = [...state.keys];

      modifiedKeys.splice(keyIdx, 1, newName);

      if (state.selectedKeys.includes(oldName)) {
        const selectedKeys = [...state.selectedKeys];
        const idx = selectedKeys.findIndex((s) => s === oldName);
        selectedKeys.splice(idx, 1, newName);

        return {
          ...state,
          selectedKeys,
          keys: modifiedKeys,
        };
      }

      return {
        ...state,
        keys: modifiedKeys,
      };
    },
    setNamespaceSelection: (state, action: PayloadAction<{ namespacePartial: string; namespace: string }>) => {
      const newSearch = [state.namespaceSelection, action.payload.namespacePartial]
        .filter((s) => s)
        .join(action.payload.namespace);

      return { ...state, namespaceSelection: newSearch };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectionActions.deleteConnection.type, (state, action: PayloadAction<Connection>) => {
        if (state.name === action.payload.name) {
          return initialState;
        }

        return state;
      })
      .addCase(
        connectionActions.editConnection.type,
        (state, action: PayloadAction<{ old: Connection; new: Connection }>) => {
          if (state.name === action.payload.old.name) {
            return { ...state, name: action.payload.new.name };
          }

          return state;
        },
      );
  },
});

export const redisActions = redisSlice.actions;

export default redisSlice.reducer;
