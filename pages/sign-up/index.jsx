import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SignUpScreen } from "@/screens/(auth)/signUp/index";

const SignUpPage = () => <SignUpScreen />;

SignUpPage.getLayout = (page) => <>{page}</>;

export const getStaticProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
		},
	};
};

export default SignUpPage;
