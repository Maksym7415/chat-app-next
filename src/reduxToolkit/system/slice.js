import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: true,
};

const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setSystemTokenAction(state, { payload }) {
      state.token = payload;
    },
  },
});

export default systemSlice.reducer;
export const { setSystemTokenAction } = systemSlice.actions;
