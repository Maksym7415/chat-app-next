import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Verification from "@/screens/verification";

const VerificationPage = () => <Verification />;

export const getStaticProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
		},
	};
};


export default VerificationPage;
