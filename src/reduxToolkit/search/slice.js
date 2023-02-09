import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchContactsParams: {
    search: "",
    offset: 0,
    direction: "",
    limit: 0,
  },
  searchContacts: "",
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
      state.searchContactsParams = {
        ...state.searchContactsParams,
        ...payload,
      };
    },
    resetSearchContactsAction(state) {
      state.searchContactsParams = initialState.searchContactsParams;
    },
  },
});

export const {
  setLoadingSearchContacts,
  setSearchContactsAction,
  resetSearchContactsAction,
} = searchSlice.actions;

export default searchSlice.reducer;
