import { allActionsStore } from "@/store/rootActions";
import { IS_CLIENT } from "@/core/constants/general";
import { store } from "@/store/store";
import { getTokenCook, getUserInfoTokenCook } from "@/core/cookiesStorage/index";

const AuthProvider = ({ children }) => {


  if (IS_CLIENT) {
    const token = getTokenCook();
    const userInfoTokenCook = getUserInfoTokenCook();

    if (token) {
      const authSlice = store.getState().authSlice;
      
      !authSlice.authToken.userId &&
        store.dispatch(
          allActionsStore.authTokenAction(userInfoTokenCook)
        );
    }
  }

  return <>{children}</>;
};

export default AuthProvider;
