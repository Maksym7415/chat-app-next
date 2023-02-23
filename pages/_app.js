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
import { authTokenAction, setAuthHeadersAction } from "@/store/auth/slice";

if (!process.browser) React.useLayoutEffect = React.useEffect;

const App = ({ Component, ...rest }) => {
  const { pageProps } = rest;

  const { store, props } = wrapper.useWrappedStore(rest);

  if (IS_CLIENT) {
    const token = getTokenCook();

    if (token) {
      const authSlice = store.getState().authSlice;

      !authSlice.headers.accessToken &&
        store.dispatch(setAuthHeadersAction({ accessToken: token }));
      !authSlice.authToken.userId &&
        store.dispatch(
          authTokenAction({
            token,
          })
        );
    }
  }

  return (
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
  );
};

export default App;
