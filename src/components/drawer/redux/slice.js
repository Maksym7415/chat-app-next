import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  drawerConfig: {
    anchor: "left",
    open: false,
    type: "",
    width: 300,
    configContent: {
      typeProfile: "",
      conversationData: {},
    },
  },
};

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    setDrawerConfigAction(state, { payload }) {
      state.drawerConfig = payload;
    },
    setDrawerClearConfigAction(state) {
      state.drawerConfig = initialState.drawerConfig;
    },
  },
});

export const { setDrawerConfigAction, setDrawerClearConfigAction } =
  drawerSlice.actions;
export default drawerSlice.reducer;
