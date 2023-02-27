import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackAuth } from "@/core/constants/urlBack";
import { setTokenCook } from "@/core/cookiesStorage";
import { allActionsStore } from "@/store/rootActions";
import { fErrorResponse, onQueryStartedFulfilled } from "@/store/helpers";

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
        options.dispatch(allActionsStore.setLoginSingInAction(dataSend.login));

        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;
            options.dispatch(
              allActionsStore.setVerificationCodeAction(data.verificationCode)
            );
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
        options.dispatch(allActionsStore.setLoginSingInAction(dataSend.login));

        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            setTokenCook(data.accessToken);

            options.dispatch(allActionsStore.setAuthHeadersAction(data));
            options.dispatch(
              allActionsStore.authTokenAction({
                token: data.accessToken,
              })
            );
            options.dispatch(allActionsStore.setTokenAction(data.accessToken));
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
