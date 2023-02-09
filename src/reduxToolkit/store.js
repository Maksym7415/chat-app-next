import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducers } from "./rootReducer";
import { conversationsApi } from "@/services/conversations/serviceRedux";
import { authApi } from "@/services/auth/serviceRedux";
import { userApi } from "@/services/user/serviceRedux";
import { searchApi } from "@/services/search/serviceRedux";

export const store = configureStore({
  reducer: reducers,
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

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
