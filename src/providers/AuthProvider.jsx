import { allActionsStore } from "@/store/rootActions";
import { IS_CLIENT } from "@/core/constants/general";
import { store } from "@/store/store";
import { getSession, useSession } from "next-auth/react";

const AuthProvider = ({ children, Component: { isPrivatePage } }) => {
  const session = useSession();

  if (IS_CLIENT) {
    const token = session?.data?.accessToken;
    if (token) {
      const authSlice = store.getState().authSlice;

      !authSlice.headers.accessToken &&
        store.dispatch(
          allActionsStore.setAuthHeadersAction({ accessToken: token })
        );
      !authSlice.authToken.userId &&
        store.dispatch(
          allActionsStore.authTokenAction({
            token,
          })
        );
    }
  }

  return <>{children}</>;
};

export default AuthProvider;
