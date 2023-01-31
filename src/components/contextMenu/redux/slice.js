import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  contextMenuConfig: {
    event: null,
    isShowMenu: false,
    messageId: 0,
    config: [],
    callBackItem: null,
  },
};

const contextMenuSlice = createSlice({
  name: "contextMenuSlice",
  initialState,
  reducers: {
    setContextMenuConfigAction(state, { payload }) {
      state.contextMenuConfig = payload;
    },
    setContextMenuClearConfigAction(state) {
      state.contextMenuConfig = initialState.contextMenuConfig;
    },
  },
});

export const { setContextMenuConfigAction, setContextMenuClearConfigAction } =
  contextMenuSlice.actions;
export default contextMenuSlice.reducer;
