import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducers } from "./rootReducer";
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { authApi } from "@/rtkQuery/auth/serviceRedux";
import { userApi } from "@/rtkQuery/user/serviceRedux";
import { searchApi } from "@/rtkQuery/search/serviceRedux";

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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["persistSlice"],
};

const persistedReducer = persistReducer(persistConfig, logoutReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      conversationsApi.middleware,
      authApi.middleware,
      userApi.middleware,
      searchApi.middleware
    ),
});
export const persistor = persistStore(store);
export const makeStore = () => {
  store.__persistor = persistor;
  return store;
};
export const wrapper = createWrapper(makeStore);
