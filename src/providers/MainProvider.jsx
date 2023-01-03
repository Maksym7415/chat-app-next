"use client";

import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "@/config/theme";
import { store } from "src/reduxToolkit/store";
import ContextMenu from "@/components/contextMenu";
import ModalCustom from "@/components/modal";
import DrawerCustom from "@/components/drawer";
import DialogCustom from "@/components/dialogWindow/Dialog";

const cache = createCache({
  key: "css",
  prepend: true,
});

const MainProvider = ({ session, children }) => {
  return (
    // <Theme>
    <Provider store={store}>
      <DrawerCustom />
      <ContextMenu />
      <ModalCustom />
      <DialogCustom />
      {/* <CssBaseline /> */}
      {children}
    </Provider>
    // </Theme>
  );
};

export default MainProvider;
