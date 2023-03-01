import { removeTokenCook } from "@/core/cookiesStorage";
import { logOutAction, store } from "@/store/store";
import {  signOut } from "next-auth/react";

export const actionLogOut = () => {
  removeTokenCook();
  signOut({callbackUrl: "/sign-in"});
  store.dispatch(logOutAction());
};
