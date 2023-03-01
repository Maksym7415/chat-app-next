import React from "react";
import Providers from "@/providers/MainProvider";
import { wrapper } from "@/store/store";
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
import { PATHS } from "@/core/constants/paths";
import Spinner from "@/core/spinner";
import PageLoader from "./components/PageLoader";
// import Router, { useRouter } from "next/router";

if (!process.browser) React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, ...rest }) => {
  const { pageProps, session } = rest;

  const { store } = wrapper.useWrappedStore(rest);
  const [interval, setInterval] = useState(0);
  console.log(IS_CLIENT, " App IS_CLIENT");

  // const [loading, setLoading] = useState(false);
  // const handleStart = () => {
  //   setLoading(true);
  // };
  // const handleComplete = () => {
  //   setLoading(false);
  // };

  // Router.events.on("routeChangeStart", handleStart);
  // Router.events.on("routeChangeComplete", handleComplete);
  // Router.events.on("routeChangeError", handleComplete);

  return (
    <>
      {/* <PageLoader /> */}
      <SessionProvider
        session={session}
        refetchInterval={interval}
        refetchOnWindowFocus={false}
      >
        <Provider store={store}>
          <PersistGate loading={<Spinner />} persistor={store.__persistor}>
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
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  console.time("----time");
  const session = await getSession(ctx);
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!session) {
    if (
      ![PATHS.signIn, PATHS.signUp, PATHS.verification].includes(ctx.asPath)
    ) {
      ctx.res.writeHead(302, { Location: PATHS.signIn });
      ctx.res.end();
      return {};
    }
  } else {
    if (
      [PATHS.signIn, PATHS.verification, PATHS.signUp].includes(ctx.asPath) &&
      session
    ) {
      ctx.res.writeHead(302, { Location: PATHS.main });
      ctx.res.end();
      return { pageProps, session };
    }
  }

  console.timeEnd("----time");

  return { pageProps, session };
};

export default MyApp;
