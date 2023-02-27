import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
  theme: {
    core: "light",
  },
};

export const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    setLangAction(state, { payload }) {
      state.lang = payload;
    },
    setThemeAction(state, { payload }) {
      state.theme = { ...state.theme, ...payload };
    },
  },
});

export default settingSlice.reducer;
