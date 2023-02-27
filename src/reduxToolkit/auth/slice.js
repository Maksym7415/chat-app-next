import { createSlice } from "@reduxjs/toolkit";
import { jwtdecode } from "../../helpers";

export const initialAuthToken = {
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

export const authSlice = createSlice({
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
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.authSlice,
  //     };
  //   },
  // },
});

export default authSlice.reducer;
