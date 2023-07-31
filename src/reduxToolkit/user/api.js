/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackUser } from "@/constants/urlBack";
import {
	fErrorResponse,
	onQueryStartedFulfilled,
	onQueryStartedFulfilledCb,
} from "@/store/helpers";
import { allActionsStore } from "@/store/rootActions";

export const userApi = createApi({
	reducerPath: "userApi",
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

						data?.lang &&
							options.dispatch(
								allActionsStore.setLangAction(data?.lang),
							);
						// options.dispatch(
						// 	allActionsStore.setUserInfoAction(data),
						// );

						onQueryStartedFulfilledCb({ propsData, data });
					},
				});
			},
		}),

		getUserAvatars: builder.query({
			query: (_) => pathBackUser.getAvatars,
			providesTags: (result = []) => [
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

						options.dispatch(
							allActionsStore.seUserAvatarsAction(data),
						);

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
			invalidatesTags: (result, error, arg) => [
				{ type: "Avatar", id: arg.id },
			],
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
			invalidatesTags: (result, error, arg) => [
				{ type: "Avatar", id: arg.id },
			],
			transformErrorResponse: (response, meta, args) =>
				fErrorResponse({ response, meta, args }),
		}),
	}),
});
