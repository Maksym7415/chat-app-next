import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackSearch } from "@/core/constants/urlBack";
import { fErrorResponse } from "@/store/helpers";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: axiosBaseQuery({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload?.[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getSearchContacts: builder.query({
      query: ({ params }) => ({ url: pathBackSearch.searchContact, params }),
      transformErrorResponse: (response, meta, args) =>
        fErrorResponse({ response, meta, args }),
    }),
  }),
});
