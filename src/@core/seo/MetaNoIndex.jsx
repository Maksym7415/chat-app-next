import Head from "next/head";
import { titleMerge } from "./config";

// fix locale
export const MetaNoIndex = ({ title = "error" }) => (
	<Head>
		<title>{titleMerge(title)}</title>
		<meta
			name="robots"
			content="noindex, nofollow"
		/>
	</Head>
);
