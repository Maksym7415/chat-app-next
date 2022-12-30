import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";
import { jwtdecode } from "../../helpers";

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
  },
  extraReducers: (builder) => {
    builder.addCase(requests.postLoginRequest.fulfilled, (state, action) => {
      state.verificationCode = action.payload.verificationCode;
    });
  },
});

export const { authTokenAction, setAuthHeadersAction, setLoginSingInAction } =
  authSlice.actions;

export default authSlice.reducer;
