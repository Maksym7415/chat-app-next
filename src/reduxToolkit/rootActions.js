import { appSlice } from "@/store/app/slice";
import { authSlice } from "@/store/auth/slice";
import { settingSlice } from "@/store/setting/slice";
import { conversationsSlice } from "@/store/conversations/slice";
import { userSlice } from "@/store/user/slice";
import { searchSlice } from "@/store/search/slice";

export const allActionsStore = {
  ...appSlice.actions,
  ...authSlice.actions,
  ...settingSlice.actions,
  ...conversationsSlice.actions,
  ...userSlice.actions,
  ...searchSlice.actions,
};
