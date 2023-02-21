import React from "react";
import Providers from "@/providers/MainProvider";
import ContextMenu from "@/components/contextMenu";
import ModalCustom from "@/components/modal";
import DrawerCustom from "@/components/drawer";
import DialogCustom from "@/components/dialogWindow/Dialog";
import "../styles/globals.css";

if (!process.browser) React.useLayoutEffect = React.useEffect;

function App({ Component, ...rest }) {
  const { pageProps } = rest;

  return (
    <Providers Component={Component}>
      <DrawerCustom />
      <ContextMenu />
      <ModalCustom />
      <DialogCustom />
      <Component {...pageProps} />
    </Providers>
  );
}
export default App;
