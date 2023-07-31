import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { MetaNoIndex } from "./MetaNoIndex";
import { siteName, titleMerge } from "./config";
import { onlyText } from "@/helpers/index";

const Meta = ({ title, description, image = null, children }) => {
	const { asPath } = useRouter();
	const { t } = useTranslation("common");

	// VARIABLES
	const currentUrl = `${process.env.BASE_URL}${asPath}`;
	const titlePage = t(title);

	return (
		<>
			{description ? (
				<Head>
					<title itemProp="headline">{titleMerge(titlePage)}</title>
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
						content={titleMerge(titlePage)}
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
				<MetaNoIndex title={titlePage} />
			)}
			{children}
		</>
	);
};

export default Meta;
