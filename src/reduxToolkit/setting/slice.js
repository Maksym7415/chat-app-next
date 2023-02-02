import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "settingSlice",
  initialState: {
    error: {},
    isLangSet: false,
    lang: "en",
    theme: {
      core: "light",
    },
  },
  reducers: {
    setLangAction(state, { payload }) {
      state.lang = payload;
      state.isLangSet = true;
    },
    setThemeAction(state, { payload }) {
      state.theme = { ...state.theme, ...payload };
    },
  },
});

export const { setLangAction, setThemeAction } = settingSlice.actions;
export default settingSlice.reducer;
