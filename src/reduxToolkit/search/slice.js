import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";

const initialState = {
  searchContacts: {
    response: [],
    limit: 0,
    search: "",
    direction: "",
    offset: 0,
  },
  searchSettingsQuestions: { response: [] },
  isLoading: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setLoadingSearchContacts(state, { payload }) {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      requests.getSearchContactRequest.fulfilled,
      (state, action) => {
        state.searchContacts = action.payload;
      }
    );
  },
});

export const { setLoadingSearchContacts } = searchSlice.actions;

export default searchSlice.reducer;
