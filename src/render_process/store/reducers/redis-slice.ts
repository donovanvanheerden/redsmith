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
        ...action.payload,
      };
    },
  },
});

export const redisActions = redisSlice.actions;

export default redisSlice.reducer;
