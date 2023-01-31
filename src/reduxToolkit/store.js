import { configureStore } from "@reduxjs/toolkit";
import {
  createSelector,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";

import storage from "./sync_storage";
// import { createWrapper } from "next-redux-wrapper";

import { reducers } from "./rootReducer";

import { setAuthHeadersAction, authTokenAction } from "./auth/slice";

const initialSystemState = {
  data: null,
};

const systemSlice = createSlice({
  name: "system",
  initialState: initialSystemState,
  reducers: {
    systemLoaded(state, { payload }) {
      state.data = payload.data;
    },
  },
});

// System thunk
export const fetchSystem = () => async (dispatch) => {
  const timeoutPromise = (timeout) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

  await timeoutPromise(200);

  dispatch(
    systemSlice.actions.systemLoaded({
      data: {
        source: "GIAP",
      },
    })
  );
};

// export const store = configureStore({
//   reducer: combineReducers(reducers),
//   // reducer: reducers,
//   devTools: true,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// const makeStore = () => store;
export const makeStore = () => store;
// const makeStore = ({ isServer }) => {
//   if (isServer) {
//     //If it's on server side, create a store
//     return store;
//   } else {
//     //If it's on client side, create a store which will persist
//     const { persistStore, persistReducer } = require("redux-persist");

//     const persistConfig = {
//       key: "nextjs",
//       whitelist: ["systemSlice"], // only counter will be persisted, add other reducers if needed
//       storage, // if needed, use a safer storage
//     };

//     const persistedReducer = persistReducer(
//       persistConfig,
//       combineReducers(reducers)
//     ); // Create a new reducer with our existing reducer

//     const store = configureStore({
//       reducer: persistedReducer,
//       devTools: true,
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//           serializableCheck: false,
//         }),
//     });

//     store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

//     return store;
//   }
// };

export const wrapper = createWrapper(makeStore);

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
