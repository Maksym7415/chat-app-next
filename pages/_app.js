import React from "react";
import Providers from "@/providers/MainProvider";
import { wrapper, store as storeRedux, persistor } from "@/store/store";
import { useStore } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ContextMenu from "@/components/contextMenu";
import ModalCustom from "@/components/modal";
import DrawerCustom from "@/components/drawer";
import DialogCustom from "@/components/dialogWindow/Dialog";
import "../styles/globals.css";
import { IS_CLIENT } from "@/core/constants/general";
import { getTokenCook } from "@/core/cookiesStorage/index";
import { allActionsStore } from "@/store/rootActions";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import RefreshTokenHandler from "./components/refreshTokenHandler";
import { getSession } from "next-auth/react";

if (!process.browser) React.useLayoutEffect = React.useEffect;

const App = ({ Component, ...rest }) => {
  const { pageProps, session } = rest;

  const { store, props } = wrapper.useWrappedStore(rest);
  const [interval, setInterval] = useState(0);

  console.log(session, IS_CLIENT, "IS_CLIENT");
  const getSessionToken = async () => {
    return await getSession()?.accessToken;
  };
  console.log(getSessionToken(), IS_CLIENT, "getSessionToken");
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
  console.log(session, "--1---session");

  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.__persistor}>
          <Providers Component={Component}>
            <DrawerCustom />
            <ContextMenu />
            <ModalCustom />
            <DialogCustom />
            <Component {...pageProps} />
          </Providers>
        </PersistGate>
      </Provider>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
};

export default App;
