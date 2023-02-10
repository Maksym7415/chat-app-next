import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducers } from "./rootReducer";
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { authApi } from "@/rtkQuery/auth/serviceRedux";
import { userApi } from "@/rtkQuery/user/serviceRedux";
import { searchApi } from "@/rtkQuery/search/serviceRedux";

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
      searchApi.middleware
    ),
});

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
