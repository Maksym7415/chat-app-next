import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { signOut } from 'next-auth/react';
import { reducers } from "./rootReducer";
import { authApi } from "@/store/auth/api";
import { conversationsApi } from "@/store/conversations/api";
import { searchApi } from "@/store/search/api";
import { userApi } from "@/store/user/api";

const rootReducer = combineReducers(reducers);

const actionTypeLogout = "LOGOUT";

export const logOutAction = () => ({
	type: actionTypeLogout,
});

const logoutReducer = (state, action) => {
	if (action.type === actionTypeLogout) {
		// eslint-disable-next-line no-param-reassign
		state = undefined;
	}
	return rootReducer(state, action);
};

export const store = configureStore({
	reducer: logoutReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(
			conversationsApi.middleware,
			authApi.middleware,
			userApi.middleware,
			searchApi.middleware,
		),
});


export const actionLogOut = async () => {
	await signOut({
		redirect: false,
	});
	store.dispatch(logOutAction());
};