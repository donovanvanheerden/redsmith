import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Connection } from '../../../core/interfaces';

type ConnectionState = Record<string, Connection>;

const initialState: ConnectionState = {};

export const connectionSlice = createSlice({
  name: 'connections',
  initialState: initialState,
  reducers: {
    setConnections: (_, action: PayloadAction<Connection[]>) => {
      const state = (action.payload || []).reduce((prev, current) => {
        return { ...prev, [current.name]: current };
      }, {});

      return state;
    },
    addConnection: (state, action: PayloadAction<Connection>) => {
      return { ...state, [action.payload.name]: action.payload };
    },
    editConnection: (state, action: PayloadAction<{ old: Connection; new: Connection }>) => {
      const newState = { ...state };

      delete newState[action.payload.old.name];

      return { ...newState, [action.payload.new.name]: action.payload.new };
    },
    deleteConnection: (state, action: PayloadAction<Connection>) => {
      const connections = { ...state };

      delete connections[action.payload.name];

      return connections;
    },
  },
});

export const connectionActions = connectionSlice.actions;

export default connectionSlice.reducer;
