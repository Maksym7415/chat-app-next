import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignIn from "@/screens/(auth)/signIn";

const SignInPage = () => <SignIn />;

export const getStaticProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
		},
	};
};


export default SignInPage;
