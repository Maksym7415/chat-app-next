import Head from "next/head";
import { titleMerge } from "./config";

export const MetaNoIndex = ({ title = "error" }) => (
	<Head>
		<title>{titleMerge(title)}</title>
		<meta
			name="robots"
			content="noindex, nofollow"
		/>
	</Head>
);
