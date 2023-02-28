import { allActionsStore } from "@/store/rootActions";
import { IS_CLIENT } from "@/core/constants/general";
import { store } from "@/store/store";
import { getSession } from "next-auth/react";

const AuthProvider = ({ children, Component: { isPrivatePage } }) => {
  const getSessionToken = async () => {
    return await getSession()?.accessToken;
  };

  if (IS_CLIENT) {
    const token = session?.accessToken;
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
