import { removeTokenCook } from "@/config/cookiesStorage";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useSettingStore } from "@/storeZustand/setting/store";

export const actionLogOut = () => {
  useSettingStore.getState().setLangAction("en");
  useAuthStore.getState().authTokenAction(null);
  useAuthStore.getState().setAuthHeadersAction({ accessToken: "" });
  removeTokenCook();
};
