import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import settingSlice from "./setting/slice";
import conversationsSlice from "./conversations/slice";
import userSlice from "./user/slice";
import searchSlice from "./search/slice";
import contactsSlice from "./contacts/slice";
// import modalSlice from "../components/modal/redux/slice";
// import drawerSlice from "../components/drawer/redux/slice";
// import contextMenuSlice from "../components/contextMenu/redux/slice";
// import dialogWindowSlice from "../components/dialogWindow/redux/slice";

export const reducers = {
  appSlice,
  authSlice,
  settingSlice,
  conversationsSlice,
  userSlice,
  searchSlice,
  contactsSlice,
  // in components
  // modalSlice,
  // drawerSlice,
  // contextMenuSlice,
  // dialogWindowSlice,
  //
};
