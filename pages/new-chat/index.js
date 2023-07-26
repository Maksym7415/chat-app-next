import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LayoutMain from "@/core/layouts/LayoutMain";

const NewChatPage = () => <LayoutMain />;

export const getStaticProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
		},
	};
};

export default NewChatPage;
