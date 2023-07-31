import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import HeadProvider from "./HeadProvider/HeadProvider";
import { SnackbarUtilsConfigurator } from "@/helpers/notistack";

const MainProvider = ({ children }) => (
	<HeadProvider>
		<SnackbarProvider maxSnack={3}>
			<SnackbarUtilsConfigurator />
			<CssBaseline />
			{children}
		</SnackbarProvider>
	</HeadProvider>
);
export default MainProvider;
