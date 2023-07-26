// APPROVED
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import themeOptions from "./ThemeOptions";

const ThemeComponent = ({ settings = {}, children }) => {
	const theme = createTheme(themeOptions(settings, "light"));

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default ThemeComponent;
