import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";
import { jwtdecode } from "../../helpers";
import { HYDRATE } from "next-redux-wrapper";

const initialAuthToken = {
  role: "",
  login: "",
  userAgent: "",
  firstName: "",
  userId: 0,
  type: "",
  iat: 0,
  exp: 0,
};

const initialState = {
  loginSingIn: null,
  verificationCode: null,
  authToken: initialAuthToken,
  headers: { accessToken: "" },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authTokenAction(state, { payload }) {
      let payloadLocal = initialAuthToken;
      try {
        payloadLocal = payload ? jwtdecode(payload.token) : payloadLocal;
      } catch (e) {}
      state.authToken = payloadLocal;
    },
    setAuthHeadersAction(state, { payload }) {
      state.headers = { ...state.headers, ...payload };
    },
    setLoginSingInAction(state, { payload }) {
      state.loginSingIn = payload;
    },
    setVerificationCodeAction: (state, { payload }) => {
      state.verificationCode = payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log(state, 'state')
      // console.log(action.payload, 'action.payload.authSlice')
      return {
        ...state,
        ...action.payload.authSlice,
      };
    },
  },
});

export const {
  authTokenAction,
  setAuthHeadersAction,
  setLoginSingInAction,
  setVerificationCodeAction,
} = authSlice.actions;

export default authSlice.reducer;
