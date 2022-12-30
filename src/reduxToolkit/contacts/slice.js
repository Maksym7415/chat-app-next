import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";

const initialState = {
  contacts: [],
  isLoading: false,
};

const contactsSlice = createSlice({
  name: "contactsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requests.postCheckEmailsRequest.fulfilled,
      (state, action) => {
        state.contacts = action.payload;
      }
    );
  },
});

export default contactsSlice.reducer;
