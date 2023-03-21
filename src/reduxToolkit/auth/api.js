import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/core/axios/axiosBaseQuery";
import { pathBackAuth } from "@/core/constants/urlBack";
import {
	setTokenCook,
	setUserInfoTokenCook,
} from "@/core/cookiesStorage/index";
import { getDateFromToday, jwtdecode } from "@/helpers/index";
import { fErrorResponse, onQueryStartedFulfilled } from "@/store/helpers";
import { allActionsStore } from "@/store/rootActions";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: axiosBaseQuery({}),
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
				options.dispatch(
					allActionsStore.setLoginSingInAction(dataSend.login),
				);

				onQueryStartedFulfilled({
					options,
					cb: (res) => {
						const { data } = res;
						options.dispatch(
							allActionsStore.setVerificationCodeAction(
								data.verificationCode,
							),
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
				options.dispatch(
					allActionsStore.setLoginSingInAction(dataSend.login),
				);

				onQueryStartedFulfilled({
					options,
					cb: async (res) => {
						const { data } = res;

						const jwtDecode = data.accessToken
							? await jwtdecode(data.accessToken)
							: null;

						const optionsCook = {
							expires: getDateFromToday({
								days: 365,
							}),
							secure: true,
						};

						setTokenCook(data.accessToken, optionsCook);
						setUserInfoTokenCook(jwtDecode, optionsCook);

						options.dispatch(
							allActionsStore.authTokenAction(jwtDecode),
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

						options.dispatch(
							authApi.endpoints.postLogin.initiate(sendData),
						);
					},
				});
			},
		}),
	}),
});
