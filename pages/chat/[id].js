import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirectToPageAuth } from "@/helpers/forSSR/redirectToPage";
import { PATHS } from "@/constants/paths";
import Chat from "@/screens/chat/index";

const ChatIdPage = ({ params }) => <Chat params={params} />;

export const getServerSideProps = async (ctx) => {
	const { locale, res, req, query, params } = ctx;

	const titlePage = "generals.chat";
	const session = await getServerSession(req, res, authOptions);
	const token = session?.user?.token;

	if (!token) {
		return redirectToPageAuth({
			queryParams: query,
			callbackUrl: PATHS.chat,
		});
	}

	try {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", [
					"common",
				])),
				titlePage,
				params,
			},
		};
	} catch (error) {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", [
					"common",
				])),
				titlePage,
				params,
			},
		};
	}
};

export default ChatIdPage;
