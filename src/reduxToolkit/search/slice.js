import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchContactsParams: {
    search: "",
    offset: 0,
    direction: "",
    limit: 0,
  },
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
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

export default searchSlice.reducer;
