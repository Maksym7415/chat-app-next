import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackConversations } from "@/core/constants/urlBack";
import { fErrorResponse, onQueryStartedFulfilled } from "@/services/helpers";
import {
  setConversationListAction,
  updateUserHistoryConversation,
} from "@/store/conversations/slice";
import { cbInitialMessages } from "@/actions/chat";
import { IS_SERVER, IS_CLIENT } from "@/core/constants/general";

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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getUserConversations: builder.query({
      query: (_) => pathBackConversations.getUserConversations,
      transformResponse: (response, meta, arg) => {
        const responseData = response?.data;
        const transformData = responseData.reduce((acc, item) => {
          acc[item.conversationId] = item;
          return acc;
        }, {});

        console.log(arg, "arg getUserConversations");

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

            options.dispatch(setConversationListAction(data));
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

            sendData?.cb && IS_CLIENT && sendData.cb(data);

            if (IS_SERVER) {
              cbInitialMessages(data, sendData?.conversationId, options);
            }

            options.dispatch(
              updateUserHistoryConversation({
                conversationId: sendData?.conversationId,
                data: { pagination: data.pagination },
              })
            );
          },
        });
      },
    }),
  }),
});

export const {} = conversationsApi;
