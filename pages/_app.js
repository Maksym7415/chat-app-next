import React from "react";
import Providers from "@/providers/MainProvider";
import { wrapper } from "@/store/store";
import "../styles/globals.css";

if (!process.browser) React.useLayoutEffect = React.useEffect;

function App({ Component, ...rest }) {
  const { pageProps } = rest;

  return (
    <Providers Component={Component}>
      <Component {...pageProps} />
    </Providers>
  );
}
export default wrapper.withRedux(App);
