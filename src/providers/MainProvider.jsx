import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "@/core/theme";
import ContextMenu from "@/components/contextMenu";
import ModalCustom from "@/components/modal";
import DrawerCustom from "@/components/drawer";
import DialogCustom from "@/components/dialogWindow/Dialog";
import AuthProvider from "./AuthProvider";

import { SnackbarUtilsConfigurator } from "@/helpers/notistack";
import HeadProvider from "./HeadProvider/HeadProvider";
import { store } from "@/store/store";
import { Provider } from "react-redux";

const cache = createCache({
  key: "css",
  prepend: true,
});

const MainProvider = ({ children, Component }) => {
  // console.log(Component, "Component");
  // console.log(Component?.isPrivatePage, "omponent?.isPrivatePage");
  return (
    // <Theme>

    <HeadProvider>
      <Provider store={store}>
        <AuthProvider Component={Component}>
          <SnackbarProvider maxSnack={3}>
            <SnackbarUtilsConfigurator />
            <DrawerCustom />
            <ContextMenu />
            <ModalCustom />
            <DialogCustom />
            <CssBaseline />
            {children}
          </SnackbarProvider>
        </AuthProvider>
      </Provider>
    </HeadProvider>

    // </Theme>
  );
};

export default MainProvider;
