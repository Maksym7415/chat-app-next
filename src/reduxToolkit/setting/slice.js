import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
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

export default settingSlice.reducer;
