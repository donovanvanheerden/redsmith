import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '../../../core/interfaces';

const initialState: Settings = {
  autoFormat: true,
  preferredLanguage: 'text',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setPreferredLanguage: (state, action: PayloadAction<'text' | 'json'>) => {
      return { ...state, preferredLanguage: action.payload };
    },
    saveSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
