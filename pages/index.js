import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirectToPageAuth } from "@/helpers/forSSR/redirectToPage";
import { PATHS } from "@/constants/paths";

const HomePage = () => <></>;

export const getServerSideProps = async (ctx) => {
	const { locale, res, req, query } = ctx;

	const titlePage = "generals.main";
	const session = await getServerSession(req, res, authOptions);
	const token = session?.user?.token;

	if (!token) {
		return redirectToPageAuth({
			queryParams: query,
			callbackUrl: PATHS.main,
		});
	}

	try {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", ["common"])),
				titlePage,
			},
		};
	} catch (error) {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", ["common"])),
				titlePage,
			},
		};
	}
};

export default HomePage;
