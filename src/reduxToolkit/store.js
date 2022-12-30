import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";

import { reducers } from "./rootReducer";

import { setAuthHeadersAction, authTokenAction } from "./auth/slice";

export const store = configureStore({
  reducer: reducers,
  devTools: true,
});

// if (typeof window !== "undefined") {
//   console.log(localStorage, "localStorage");
//   if (localStorage?.accessToken) {
//     store.dispatch(
//       setAuthHeadersAction({ accessToken: localStorage.accessToken })
//     );
//     store.dispatch(authTokenAction({ token: localStorage.accessToken }));
//   }
// }

// export const wrapper = createWrapper(store)
