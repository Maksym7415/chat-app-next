import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
};

const persistSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setTokenAction(state, { payload }) {
      state.token = payload;
    },
  },
});

export default persistSlice.reducer;
export const { setTokenAction } = persistSlice.actions;
