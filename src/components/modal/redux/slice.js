import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modalConfig: {
    open: false,
    renderContent: "settingProfile",
    styles: {
      container: {},
    },
  },
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setModalConfigAction(state, { payload }) {
      state.modalConfig = payload;
    },
    setModalClearConfigAction(state) {
      state.modalConfig = initialState.modalConfig;
    },
  },
});

export const { setModalConfigAction, setModalClearConfigAction } =
  modalSlice.actions;
export default modalSlice.reducer;
