import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth/next";
import LayoutMain from "@/core/layouts/LayoutMain";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { fetchQuery } from "@/helpers/index";
import { pathBackConversations } from "@/constants/urlBack";

const HomePage = ({dataUserConversations}) => <LayoutMain dataUserConversations={dataUserConversations}/>;

export const getServerSideProps = async (ctx) => {
	const { locale, res, req } = ctx;

	const session = await getServerSession(req, res, authOptions);
	const token = session?.user?.token

	let dataUserConversations = {}
	try {
		// check for the city, if there is a city, make a redirect to the city

		// get trending events
		const [resUserConversations] = await Promise.all([
			fetchQuery({
				url: pathBackConversations.getUserConversations,
				token,
			}),
		]);


		console.log(resUserConversations, 'resUserConversations')
		if (resUserConversations.data?.data) {
								const responseData = resUserConversations?.data?.data;
				const transformData = responseData?.reduce((acc, item) => {
					acc[item.conversationId] = item;
					return acc;
				}, {});

				dataUserConversations = transformData
		}

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


export default HomePage;
