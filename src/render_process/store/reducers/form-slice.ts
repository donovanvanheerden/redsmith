import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  showConnectionForm: boolean
}

const initialState: FormState = {
  showConnectionForm: false
};

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    showForm: (state, action: PayloadAction<FormState>) => {
      return action.payload;
    },
  },
});

export const formActions =  formSlice.actions;

export default formSlice.reducer;
