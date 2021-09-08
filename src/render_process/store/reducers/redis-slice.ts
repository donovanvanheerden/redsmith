import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DbInfo } from '../../../core/interfaces';

interface RedisState {
  dbs: DbInfo[];
  selectedDb: number;
  keys: string[];
}

const initialState: RedisState = {
  dbs: [],
  selectedDb: 0,
  keys: [],
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
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const redisActions = redisSlice.actions;

export default redisSlice.reducer;
