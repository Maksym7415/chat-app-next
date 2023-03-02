import { logOutAction, store } from "@/store/store";
import { signOut } from "next-auth/react";

export const actionLogOut = (redirect) => {
  signOut({ 
    callbackUrl: "/sign-in", 
    redirect: redirect || false  });
  store.dispatch(logOutAction());
};
