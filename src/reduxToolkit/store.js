import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducers } from "./rootReducer";
import { conversationsApi } from "@/store/conversations/api";
import { authApi } from "@/store/auth/api";
import { userApi } from "@/store/user/api";
import { searchApi } from "@/store/search/api";

const rootReducer = combineReducers(reducers);

const actionTypeLogout = "LOGOUT";

export const logOutAction = () => ({
  type: actionTypeLogout,
});

const logoutReducer = (state, action) => {
  if (action.type === actionTypeLogout) {
    state = undefined;
  }
  return rootReducer(state, action);
};


export const store = configureStore({
  reducer: logoutReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      conversationsApi.middleware,
      authApi.middleware,
      userApi.middleware,
      searchApi.middleware,
    ),
});

export const makeStore = () => store
export const wrapper = createWrapper(makeStore);
