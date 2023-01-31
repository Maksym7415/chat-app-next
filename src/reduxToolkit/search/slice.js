import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  searchContacts: {
    search: "",
    direction: "",
    offset: 0,
    response: [],
    limit: 0,
  },
  searchSettingsQuestions: { response: [] },
  isLoading: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setLoadingSearchContacts(state, { payload }) {
      console.log(payload, "setLoadingSearchContacts");
      state.isLoading = payload;
    },
    setSearchContactsAction(state, { payload }) {
      state.searchContacts = payload;
    },
  },
});

export const { setLoadingSearchContacts, setSearchContactsAction } =
  searchSlice.actions;

export default searchSlice.reducer;
