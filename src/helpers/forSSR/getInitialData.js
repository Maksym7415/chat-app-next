import { fetchQuery } from "@/helpers/index";
import { pathBackConversations } from "@/constants/urlBack";

export const initialDataObj = {
	dataUserConversations: {}
};


export const getInitialDataAuth = async ({ session}) => {
	const returnData = initialDataObj;
	const token = session?.user?.token;

	try {
	const [resUserConversations] = await Promise.all([
			fetchQuery({
				url: pathBackConversations.getUserConversations,
				token,
			}),
		]);

		if (resUserConversations.data?.data) {
			const responseData = resUserConversations?.data?.data;
				const transformData = responseData?.reduce((acc, item) => {
					acc[item.conversationId] = item;
					return acc;
				}, {});

				returnData.dataUserConversations = transformData
		}

		return returnData;
	} catch (error) {
		return {
			...returnData,
			error,
		};
	}

}