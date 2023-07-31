import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirectToPageAuth } from "@/helpers/forSSR/redirectToPage";
import { PATHS } from "@/constants/paths";
import Chat from "@/screens/chat/index";

const NewChatPage = ({ params }) => <Chat params={params} />;

export const getServerSideProps = async (ctx) => {
	const { locale, res, req, query } = ctx;

	const titlePage = "generals.newChat";
	const session = await getServerSession(req, res, authOptions);
	const token = session?.user?.token;

	if (!token) {
		return redirectToPageAuth({
			queryParams: query,
			callbackUrl: PATHS.newChat,
		});
	}

	try {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", [
					"common",
					"home",
				])),
				titlePage,
			},
		};
	} catch (error) {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", [
					"common",
					"home",
				])),
				titlePage,
			},
		};
	}
};

export default NewChatPage;
