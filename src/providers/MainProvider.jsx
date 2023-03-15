import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./AuthProvider";
import HeadProvider from "./HeadProvider/HeadProvider";
import { IS_CLIENT } from "@/core/constants/general";
import { SnackbarUtilsConfigurator } from "@/helpers/notistack";

const MainProvider = ({ children, Component }) => {
	// console.log(IS_CLIENT, "IS_CLIENT");
	return (
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
};

export default MainProvider;
