import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import settingSlice from "./setting/slice";

export const reducers = {
  appSlice,
  authSlice,
  settingSlice,
};
