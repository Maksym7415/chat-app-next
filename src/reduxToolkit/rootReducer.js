import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import conversationsSlice from "./conversations/slice";
import searchSlice from "./search/slice";
import settingSlice from "./setting/slice";
import userSlice from "./user/slice";
import { authApi } from "@/store/auth/api";
import { conversationsApi } from "@/store/conversations/api";
import { searchApi } from "@/store/search/api";
import { userApi } from "@/store/user/api";

export const reducers = {
	[conversationsApi.reducerPath]: conversationsApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[searchApi.reducerPath]: searchApi.reducer,

	appSlice,
	authSlice,
	settingSlice,
	conversationsSlice,
	userSlice,
	searchSlice,
};
