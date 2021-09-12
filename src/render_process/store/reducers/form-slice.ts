import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  formOpen: boolean
}

const initialState: FormState = {
  formOpen: false
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
