import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import settingSlice from "./setting/slice";
import conversationsSlice from "./conversations/slice";
import userSlice from "./user/slice";
import searchSlice from "./search/slice";
import modalSlice from "../components/modal/redux/slice";
import drawerSlice from "../components/drawer/redux/slice";
import contextMenuSlice from "../components/contextMenu/redux/slice";
import dialogWindowSlice from "../components/dialogWindow/redux/slice";

import { conversationsApi } from "@/services/conversations/serviceRedux";
import { authApi } from "@/services/auth/serviceRedux";
import { userApi } from "@/services/user/serviceRedux";
import { searchApi } from "@/services/search/serviceRedux";

export const reducers = {
  appSlice,
  authSlice,
  settingSlice,
  conversationsSlice,
  userSlice,
  searchSlice,
  // in components
  modalSlice,
  drawerSlice,
  contextMenuSlice,
  dialogWindowSlice,

  [conversationsApi.reducerPath]: conversationsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
};
