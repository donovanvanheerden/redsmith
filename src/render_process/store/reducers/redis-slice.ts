import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DbInfo } from '../../../core/interfaces';

interface RedisState {
  dbs: DbInfo[];
  selectedDb: number;
  keys: string[];
  selectedKey?: string;
  value?: string;
}

const initialState: RedisState = {
  dbs: [],
  selectedDb: 0,
  keys: [],
  selectedKey: null,
  value: null,
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
    setRedisKeySelection: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      return {
        ...state,
        selectedKey: action.payload.key,
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

      if (state.selectedKey === action.payload) {
        return { ...state, dbs, keys, selectedKey: null, value: null };
      }

      return { ...state, dbs, keys };
    },
    filterKeys: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        keys: action.payload
      }
    }
  },
});

export const redisActions = redisSlice.actions;

export default redisSlice.reducer;
