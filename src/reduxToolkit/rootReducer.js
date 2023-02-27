import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import settingSlice from "./setting/slice";
import conversationsSlice from "./conversations/slice";
import userSlice from "./user/slice";
import searchSlice from "./search/slice";
import persistSlice from "./persist/slice";

import { conversationsApi } from "@/store/conversations/api";
import { authApi } from "@/store/auth/api";
import { userApi } from "@/store/user/api";
import { searchApi } from "@/store/search/api";

export const reducers = {
  [conversationsApi.reducerPath]: conversationsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,

  persistSlice,

  appSlice,
  authSlice,
  settingSlice,
  conversationsSlice,
  userSlice,
  searchSlice,
};
