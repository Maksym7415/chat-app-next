import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LayoutMain from "@/core/layouts/LayoutMain";
import Chat from "@/screens/chat/index";

const NewChatPage = ({ params }) => (
	<LayoutMain>
		<Chat params={params} />
	</LayoutMain>
);

export const getServerSideProps = async (ctx) => {
	const { locale } = ctx;

	return {
		props: {
			...(await serverSideTranslations(locale || "en", "common")),
			params: ctx.params,
		},
	};
};

export default NewChatPage;
