import React from "react";
import App from "next/app";
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
import { SessionProvider, getSession } from "next-auth/react";
import { useState } from "react";
import RefreshTokenHandler from "./components/refreshTokenHandler";
import { IS_CLIENT } from "@/core/constants/general";
import Router, { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { PATHS } from "@/core/constants/paths";

if (!process.browser) React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, ...rest }) => {
  const { pageProps, session } = rest;

  const { store, props } = wrapper.useWrappedStore(rest);
  const [interval, setInterval] = useState(0);
  console.log(IS_CLIENT, " App IS_CLIENT");
  // console.log(session, " App session");

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

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const session = await getSession(ctx);

  if (!session) {
    if (
      ![PATHS.signIn, PATHS.signUp, PATHS.verification].includes(ctx.asPath)
    ) {
      ctx.res.writeHead(302, { Location: PATHS.signIn });
      ctx.res.end();
      return {};
    }
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (
    [PATHS.signIn, PATHS.verification, PATHS.signUp].includes(ctx.asPath) &&
    session
  ) {
    ctx.res.writeHead(302, { Location: PATHS.main });
    ctx.res.end();

    return { pageProps, session };
  }

  return { pageProps, session };
};

export default MyApp;
