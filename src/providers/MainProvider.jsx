import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import ContextMenu from "@/components/contextMenu";
import ModalCustom from "@/components/modal";
import DrawerCustom from "@/components/drawer";
import DialogCustom from "@/components/dialogWindow/Dialog";
import AuthProvider from "./AuthProvider";
import { SnackbarUtilsConfigurator } from "@/helpers/notistack";
import HeadProvider from "./HeadProvider/HeadProvider";
import { wrapper } from "@/store/store";
import { IS_CLIENT } from "@/core/constants/general";

const MainProvider = ({ children, Component }) => {
  console.log(IS_CLIENT, "IS_CLIENT");
  return (
    <HeadProvider>
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
    </HeadProvider>
  );
};

export default wrapper.withRedux(MainProvider);
