import { setLangAction } from "../reduxToolkit/setting/slice";
import {
  authTokenAction,
  setAuthHeadersAction,
} from "../reduxToolkit/auth/slice";
import { removeTokenCook } from "@/config/cookiesStorage";

export const actionLogOut = () => (dispatch) => {
  dispatch(setLangAction("en"));
  dispatch(authTokenAction(null));
  dispatch(setAuthHeadersAction({ accessToken: "" }));
  removeTokenCook();
};
