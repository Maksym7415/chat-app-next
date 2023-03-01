import { logOutAction, store } from "@/store/store";
import { signOut } from "next-auth/react";

export const actionLogOut = () => {
  signOut({ callbackUrl: "/sign-in" });
  store.dispatch(logOutAction());
};
