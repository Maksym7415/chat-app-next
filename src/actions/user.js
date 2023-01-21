import { removeTokenCook } from "@/core/cookiesStorage";
import { setLangAction } from "@/store/setting/slice";
import { authTokenAction, setAuthHeadersAction } from "@/store/auth/slice";

export const actionLogOut = () => {
  dispatch(setLangAction("en"));
  dispatch(authTokenAction(null));
  dispatch(setAuthHeadersAction({ accessToken: "" }));
  removeTokenCook();
};
