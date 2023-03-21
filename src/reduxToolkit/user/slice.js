import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: {
		id: 0,
		login: "",
		firstName: "",
		lastName: "",
		tagName: "",
		fullName: "",
		status: "",
		userAvatar: "",
		userCreationTime: "",
		userUpdateTime: "",
		userLastTimeOnline: "",
		Roles: [],
		lang: "",
	},
	avatars: [],
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUserInfoAction(state, { payload }) {
			state.userInfo = payload;
		},
		seUserAvatarsAction(state, { payload }) {
			state.avatars = payload;
		},
	},
});
