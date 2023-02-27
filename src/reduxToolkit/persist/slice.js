import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
};

export const persistSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setTokenAction(state, { payload }) {
      state.token = payload;
    },
  },
});

export default persistSlice.reducer;
