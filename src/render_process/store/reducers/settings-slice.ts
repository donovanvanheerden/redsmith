import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '../../../core/interfaces';

const initialState: Settings = {
  autoFormat: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    saveSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
