import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {SignInScreen} from "@/screens/(auth)/signIn";

const SignInPage = () => <SignInScreen />;

SignInPage.getLayout = (page) => <>{page}</>;

export const getStaticProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
		},
	};
};

export default SignInPage;
