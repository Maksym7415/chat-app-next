// APPROVED
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import NextProgressBar from "nextjs-progressbar";
import Favicons from "./Favicons";

const HeadProvider = ({ children }) => {
	const theme = useTheme();

	// VARIABLES
	const accentColor = "#48b7db";

	return (
		<>
			<NextProgressBar
				color={accentColor}
				startPosition={0.1}
				stopDelayMs={200}
				height={3}
			/>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5.0"
				/>

				<Favicons />

				<meta
					name="theme-color"
					content="#181B1E"
				/>
				<meta
					name="msapplication-navbutton-color"
					content="#181B1E"
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="#181B1E"
				/>
			</Head>
			{children}
		</>
	);
};

export default HeadProvider;
