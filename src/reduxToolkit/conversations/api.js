import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackConversations } from "@/core/constants/urlBack";
import { fErrorResponse, onQueryStartedFulfilled } from "@/store/helpers";
import { allActionsStore } from "@/store/rootActions";

export const conversationsApi = createApi({
  reducerPath: "conversationsApi",
  baseQuery: axiosBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.headers?.accessToken;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserConversations: builder.query({
      query: (_) => pathBackConversations.getUserConversations,
      transformResponse: (response, meta, arg) => {
        const responseData = response?.data;
        const transformData = responseData.reduce((acc, item) => {
          acc[item.conversationId] = item;
          return acc;
        }, {});

        arg?.cb && window !== "undefined" && arg.cb(transformData);

        return transformData;
      },
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(_, options) {
        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            options.dispatch(allActionsStore.setConversationListAction(data));
          },
        });
      },
    }),

    getConversationMessages: builder.query({
      query: (args) => {
        const { additionalUrl, params } = args;

        return {
          url: `${pathBackConversations.conversationHistory}/${additionalUrl}`,
          params,
        };
      },
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(sendData, options) {
        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            sendData?.cb && sendData.cb(data);
          },
        });
      },
    }),
  }),
});

export const {} = conversationsApi;
