import React from "react";
import Providers from "@/providers/MainProvider";
import { wrapper } from "@/store/store";
import { Provider } from "react-redux";
import ContextMenu from "@/components/contextMenu";
import ModalCustom from "@/components/modal";
import DrawerCustom from "@/components/drawer";
import DialogCustom from "@/components/dialogWindow/Dialog";
import "../styles/globals.css";
import { PATHS } from "@/core/constants/paths";
import { namesCookies } from "@/core/constants/general";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";



if (!process.browser) React.useLayoutEffect = React.useEffect;

const MyApp = ({ Component, ...rest }) => {
  const { pageProps } = rest;

  const { store } = wrapper.useWrappedStore(rest);

  return (
    <>
        <Provider store={store}>
            <Providers Component={Component}>
              <DrawerCustom />
              <ContextMenu />
              <ModalCustom />
              <DialogCustom />
              <Component {...pageProps} />
            </Providers>
        </Provider>
    </>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  console.time("----time");
  const token = ctx.res?.req?.cookies?.[namesCookies.accessToken];

  if (!token) {
    if (
      ![PATHS.signIn, PATHS.signUp, PATHS.verification].includes(ctx.asPath)
    ) {
      ctx.res?.writeHead(302, { Location: PATHS.signIn });
      ctx.res?.end();
      return {};
    }
  } else {
    if (
      [PATHS.signIn, PATHS.verification, PATHS.signUp].includes(ctx.asPath) 
    ) {
      ctx.res?.writeHead(302, { Location: PATHS.main });
      ctx.res?.end();
    }
  }

  console.timeEnd("----time");
  return {};
};




export default MyApp;
