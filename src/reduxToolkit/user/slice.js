import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";

// need ts

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      requests.getUserProfileDataRequest.fulfilled,
      (state, action) => {
        state.userInfo = action.payload;
      }
    );
    builder.addCase(requests.getUserAvatars.fulfilled, (state, action) => {
      state.avatars = action.payload;
    });
  },
});

export default userSlice.reducer;
