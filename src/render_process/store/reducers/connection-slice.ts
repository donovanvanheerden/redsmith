import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Connection } from '../../../core/interfaces';

type ConnectionState = Record<string, Connection>;

const initialState: ConnectionState = {};

export const connectionSlice = createSlice({
  name: 'connections',
  initialState: initialState,
  reducers: {
    setConnections: (_, action: PayloadAction<Connection[]>) => {
      console.log('payload: ', action.payload);

      const state = (action.payload || []).reduce((prev, current) => {
        return { ...prev, [current.name]: current };
      }, {});

      return state;
    },
  },
});

export const connectionActions = connectionSlice.actions;

export default connectionSlice.reducer;
