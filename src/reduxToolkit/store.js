import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { reducers } from "./rootReducer";
import {
	removeTokenCook,
	removeUserInfoTokenCook,
} from "@/core/cookiesStorage/index";
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

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export const actionLogOut = () => {
	removeTokenCook();
	removeUserInfoTokenCook();
	store.dispatch(logOutAction());
};
