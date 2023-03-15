import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./AuthProvider";
import HeadProvider from "./HeadProvider/HeadProvider";
import { SnackbarUtilsConfigurator } from "@/helpers/notistack";

const MainProvider = ({ children, Component }) => (
	<HeadProvider>
		<AuthProvider Component={Component}>
			<SnackbarProvider maxSnack={3}>
				<SnackbarUtilsConfigurator />
				<CssBaseline />
				{children}
			</SnackbarProvider>
		</AuthProvider>
	</HeadProvider>
);
export default MainProvider;
