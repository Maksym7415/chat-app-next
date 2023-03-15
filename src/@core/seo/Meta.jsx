import Head from "next/head";
import { useRouter } from "next/router";
import { MetaNoIndex } from "./MetaNoIndex";
import { siteName, titleMerge } from "./config";
import { REACT_APP_BASE_URL } from "@/core/constants/url";
import { onlyText } from "@/helpers/index";

const Meta = ({ title, description, image = null, children }) => {
	const { asPath } = useRouter();
	const currentUrl = `${REACT_APP_BASE_URL}${asPath}`;

	return (
		<>
			{description ? (
				<Head>
					<title itemProp="headline">{titleMerge(title)}</title>
					<meta
						itemProp="description"
						name="description"
						content={onlyText(description, 152)}
					/>
					<link
						rel="canonical"
						href={currentUrl}
					/>
					<meta
						property="og:locale"
						content="en"
					/>
					<meta
						property="og:title"
						content={titleMerge(title)}
					/>
					<meta
						property="og:url"
						content={currentUrl}
					/>
					<meta
						property="og:image"
						content={image || "/images/logo.svg"}
					/>
					<meta
						property="og:site_name"
						content={siteName}
					/>
					<meta
						property="og:description"
						content={onlyText(description, 197)}
					/>
				</Head>
			) : (
				<MetaNoIndex title={title} />
			)}
			{children}
		</>
	);
};

export default Meta;
