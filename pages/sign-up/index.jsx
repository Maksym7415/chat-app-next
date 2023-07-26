import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignUp from "@/screens/(auth)/signUp";

const SignUpPage = () => <SignUp />;

export const getStaticProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
		},
	};
};


export default SignUpPage;
