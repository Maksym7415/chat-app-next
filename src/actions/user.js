import { logOutAction, store } from "@/store/store";
import { removeTokenCook, removeUserInfoTokenCook } from "@/core/cookiesStorage/index";

export const actionLogOut = () => {
  removeTokenCook()
  removeUserInfoTokenCook()
  store.dispatch(logOutAction());
};
