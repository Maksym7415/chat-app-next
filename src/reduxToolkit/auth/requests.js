import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authTokenAction,
  setLoginSingInAction,
  setAuthHeadersAction,
} from "./slice";
import API from "../../config/axios";
import { pathBackAuth } from "../../config/constants/urlBack";
import { setTokenCook } from "@/config/cookiesStorage";

export const postLoginRequest = createAsyncThunk(
  "auth/postLoginRequest",
  async (options, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.signIn, {
        ...options.data,
      });

      dispatch(setLoginSingInAction(options.data.login));

      options.cb && options.cb(response.data.verificationCode);

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  }
);

export const postVerificationRequest = createAsyncThunk(
  "auth/postVerificationRequest",
  async (options, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.checkVerificationCode, {
        ...options.data,
      });

      setTokenCook(response.data.accessToken);

      await dispatch(setAuthHeadersAction(response.data));

      await dispatch(
        authTokenAction({
          token: response.data.accessToken,
        })
      );

      options.cb && options.cb();

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  }
);

export const postSingUpRequest = createAsyncThunk(
  "auth/postSingUpRequest",
  async (options, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.signUp, {
        ...options.data,
      });

      dispatch(
        postLoginRequest({
          data: {
            login: options.data.login,
          },
          cb: options.cb(),
        })
      );

      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);

      return Promise.reject(error);
    }
  }
);
