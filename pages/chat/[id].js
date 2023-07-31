import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth/next";
import LayoutMain from "@/core/layouts/LayoutMain";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getInitialDataAuth } from "@/helpers/forSSR/getInitialData";
import { redirectToPageAuth } from "@/helpers/forSSR/redirectToPage";
import { PATHS } from "@/constants/paths";
import Chat from "@/screens/chat/index";

const ChatIdPage = ({ params }) => (
	<LayoutMain params={params}>
		<Chat params={params} />
	</LayoutMain>
);

export const getServerSideProps = async (ctx) => {
	const { locale, res, req, query } = ctx;

	const session = await getServerSession(req, res, authOptions);
	const token = session?.user?.token;

	if (!token) {
		return redirectToPageAuth({
			queryParams: query,
			callbackUrl: PATHS.user_profile_edit,
		});
	}

	const { dataUserConversations } = await getInitialDataAuth({
		session,
	});

	try {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", [
					"common",
					"home",
				])),
				dataUserConversations,
			},
		};
	} catch (error) {
		return {
			props: {
				...(await serverSideTranslations(locale ?? "en", [
					"common",
					"home",
				])),
				dataUserConversations,
			},
		};
	}
};

export default ChatIdPage;
