import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import axiosBaseQuery from "@/core/axios/axiosBaseQuery";
import { pathBackUser } from "@/core/constants/urlBack";
import {
  fErrorResponse,
  onQueryStartedFulfilled,
  onQueryStartedFulfilledCb,
} from "@/services/helpers";
import { setUserInfoAction, seUserAvatarsAction } from "@/store/user/slice";
import { setLangAction } from "@/store/setting/slice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  tagTypes: ["Avatar", "UserData"],
  endpoints: (builder) => ({
    getUserProfileData: builder.query({
      query: (_) => pathBackUser.getUserProfileData,
      providesTags: ["UserData"],
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(propsData, options) {
        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            data?.lang && options.dispatch(setLangAction(data?.lang));
            options.dispatch(setUserInfoAction(data));

            onQueryStartedFulfilledCb({ propsData, data });
          },
        });
      },
    }),

    getUserAvatars: builder.query({
      query: (_) => pathBackUser.getAvatars,
      providesTags: (result = [], error, arg) => [
        "Avatar",
        ...result.map(({ id }) => ({ type: "Avatar", id })),
      ],
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(propsData, options) {
        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            options.dispatch(seUserAvatarsAction(data));

            onQueryStartedFulfilledCb({ propsData, data });
          },
        });
      },
    }),

    putMainPhoto: builder.mutation({
      query: ({ additionalUrl, data }) => ({
        url: `${pathBackUser.setMainPhoto}/${additionalUrl}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Avatar", id: arg.id }],
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
    }),

    putUpdateProfileData: builder.mutation({
      query: (data) => ({
        url: pathBackUser.updateProfile,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["UserData"],
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
      async onQueryStarted(propsData, options) {
        onQueryStartedFulfilled({
          options,
          cb: (res) => {
            const { data } = res;

            onQueryStartedFulfilledCb({ propsData, data });
          },
        });
      },
    }),

    deleteAvatar: builder.mutation({
      query: (params) => ({
        url: pathBackUser.deleteAvatar,
        method: "DELETE",
        params,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Avatar", id: arg.id }],
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
    }),
  }),
});
