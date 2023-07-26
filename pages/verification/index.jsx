import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {VerificationScreen} from "@/screens/(auth)/verification/index";

const VerificationPage = () => <VerificationScreen />;

export const getStaticProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
		},
	};
};


export default VerificationPage;
