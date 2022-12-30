import { setLangAction } from "../reduxToolkit/setting/slice";
import {
  authTokenAction,
  setAuthHeadersAction,
} from "../reduxToolkit/auth/slice";
import { removeTokenCook } from "@/config/cookiesStorage";
import { redirect } from "next/navigation";

export const actionLogOut = () => (dispatch) => {
  dispatch(setLangAction("en"));
  dispatch(authTokenAction(null));
  dispatch(setAuthHeadersAction({ accessToken: "" }));
  removeTokenCook();
  redirect("/sign-in");
};
