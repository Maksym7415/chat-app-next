import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackAuth } from "@/core/constants/urlBack";
import {
  authTokenAction,
  setLoginSingInAction,
  setAuthHeadersAction,
  setVerificationCodeAction,
} from "@/store/auth/slice";
import {
  setTokenAction
} from "@/store/persist/slice";
import { fErrorResponse, onQueryStartedFulfilled } from "@/rtkQuery/helpers";
import { setTokenCook } from "@/core/cookiesStorage";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (data) => ({
        url: pathBackAuth.signIn,
        method: "POST",
        data,
      }),
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(dataSend, options) {
        options.dispatch(setLoginSingInAction(dataSend.login));

        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;
            options.dispatch(setVerificationCodeAction(data.verificationCode));
          },
        });
      },
    }),

    postVerification: builder.mutation({
      query: (data) => ({
        url: pathBackAuth.checkVerificationCode,
        method: "POST",
        data,
      }),
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(dataSend, options) {
        options.dispatch(setLoginSingInAction(dataSend.login));

        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            setTokenCook(data.accessToken);

            options.dispatch(setAuthHeadersAction(data));
            options.dispatch(
              authTokenAction({
                token: data.accessToken,
              })
            );
            options.dispatch(
              setTokenAction(data.accessToken)
            );
          },
        });
      },
    }),

    postSingUp: builder.mutation({
      query: (data) => ({
        url: pathBackAuth.signUp,
        method: "POST",
        data,
      }),
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(dataSend, options) {
        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            const sendData = {
              login: data?.email,
            };

            options.dispatch(authApi.endpoints.postLogin.initiate(sendData));
          },
        });
      },
    }),
  }),
});
