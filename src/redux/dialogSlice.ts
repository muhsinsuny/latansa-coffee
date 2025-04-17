import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DialogType = 'remove-item' | 'confirm-logout' | null;

interface DialogState {
  type: DialogType;
}

const initialState: DialogState = {
  type: null,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogType>) => {
      state.type = action.payload;
    },
    closeDialog: (state) => {
      state.type = null;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
