import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import settingSlice from "./setting/slice";
import conversationsSlice from "./conversations/slice";
import userSlice from "./user/slice";
import searchSlice from "./search/slice";
import persistSlice from "./persist/slice";
import modalSlice from "../components/modal/redux/slice";
import drawerSlice from "../components/drawer/redux/slice";
import contextMenuSlice from "../components/contextMenu/redux/slice";
import dialogWindowSlice from "../components/dialogWindow/redux/slice";

import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { authApi } from "@/rtkQuery/auth/serviceRedux";
import { userApi } from "@/rtkQuery/user/serviceRedux";
import { searchApi } from "@/rtkQuery/search/serviceRedux";

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
  // in components
  modalSlice,
  drawerSlice,
  contextMenuSlice,
  dialogWindowSlice,
};
