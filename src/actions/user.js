import { removeTokenCook } from "@/core/cookiesStorage";
import { setLangAction } from "@/store/setting/slice";
import { authTokenAction, setAuthHeadersAction } from "@/store/auth/slice";
import { store } from "@/store/store";

export const actionLogOut = () => {
  removeTokenCook();
  store.dispatch(setLangAction("en"));
  store.dispatch(authTokenAction(null));
  store.dispatch(setAuthHeadersAction({ accessToken: "" }));
};
