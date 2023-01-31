import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";

const initialState = {
  userInfo: {
    id: 0,
    login: "",
    firstName: "",
    lastName: "",
    tagName: "",
    fullName: "",
    status: "",
    userAvatar: "",
    userCreationTime: "",
    userUpdateTime: "",
    userLastTimeOnline: "",
    Roles: [],
    lang: "",
  },
  avatars: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfoAction(state, { payload }) {
      state.userInfo = payload;
    },
  },
});

export const { setUserInfoAction } = userSlice.actions;

export default userSlice.reducer;
