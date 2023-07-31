import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackSearch } from "@/core/constants/urlBack";
import { fErrorResponse } from "@/store/helpers";

export const searchApi = createApi({
	reducerPath: "searchApi",
	baseQuery: axiosBaseQuery({
			prepareHeaders: (headers, { getState }) => {
			const token = getState().userSlice.userInfo?.token;

			let headersCopy = { ...headers };

			if (token) {
				headersCopy = Object.assign(headersCopy, {
					Authorization: token,
				});
			}
			return {
				...headersCopy,
			};
		},
	}),
	endpoints: (builder) => ({
		getSearchContacts: builder.query({
			query: ({ params }) => ({
				url: pathBackSearch.searchContact,
				params,
			}),
			transformErrorResponse: (response, meta, args) =>
				fErrorResponse({ response, meta, args }),
		}),
	}),
});
