"use client";

import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "@/core/theme";
import ContextMenu from "@/components/contextMenu";
import ModalCustom from "@/components/modal";
import DrawerCustom from "@/components/drawer";
import DialogCustom from "@/components/dialogWindow/Dialog";
import { SnackbarUtilsConfigurator } from "@/helpers/notistack";

const cache = createCache({
  key: "css",
  prepend: true,
});

const MainProvider = ({ children }) => {
  return (
    // <Theme>
    // <Provider store={store}>
    <>
    <SnackbarProvider maxSnack={3}>
          <SnackbarUtilsConfigurator />
      <DrawerCustom />
      <ContextMenu />
      <ModalCustom />
      <DialogCustom />
      <CssBaseline />
      {children}
      </SnackbarProvider>
    </>
    // </Provider>
    // </Theme>
  );
};

export default MainProvider;
