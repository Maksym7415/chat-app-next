import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  dialogConfig: {
    open: false,
    typeContent: "",
    title: "",
  },
};

const dialogWindowSlice = createSlice({
  name: "dialogWindowSlice",
  initialState,
  reducers: {
    setDialogWindowConfigAction(state, { payload }) {
      state.dialogConfig = payload;
    },
    setDialogWindowClearConfigAction(state) {
      state.dialogConfig = initialState.dialogConfig;
    },
  },
});

export const { setDialogWindowConfigAction, setDialogWindowClearConfigAction } =
  dialogWindowSlice.actions;
export default dialogWindowSlice.reducer;
