import { PATHS } from "@/constants/paths";
import { getParamsStringUrl } from "@/helpers/index";

export const redirectToPageAuth = ({
	toPage = "",
	queryParams = {},
	callbackUrl = "",
}) => {
	const { fullParamsString } = getParamsStringUrl({
		queryParams,
	});

	return {
		redirect: {
			destination: `${toPage || PATHS.signIn}${
				callbackUrl
					? `?callbackUrl=${callbackUrl}${fullParamsString}`
					: ""
			}`,
			permanent: true,
		},
	};
};
