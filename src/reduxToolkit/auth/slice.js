/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const initialAuthToken = {
	role: "",
	login: "",
	userAgent: "",
	firstName: "",
	userId: 0,
	type: "",
	iat: 0,
	exp: 0,
};

const initialState = {
	loginSingIn: null,
	verificationCode: null,
	authToken: initialAuthToken,
};

export const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		authTokenAction(state, { payload }) {
			state.authToken = payload;
		},
		setLoginSingInAction(state, { payload }) {
			state.loginSingIn = payload;
		},
		setVerificationCodeAction: (state, { payload }) => {
			state.verificationCode = payload;
		},
	},
});
