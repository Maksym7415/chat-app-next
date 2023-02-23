import { removeTokenCook } from "@/core/cookiesStorage";
import { logOutAction, store } from "@/store/store";

export const actionLogOut = () => {
  removeTokenCook();
  store.dispatch(logOutAction());
};
