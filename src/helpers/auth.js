import { getTokenCook } from "@/core/cookiesStorage/index";

export const getHeaders = async () => {
	try {
		const headersConfig = {};

		const accessToken = getTokenCook();

		if (accessToken) {
			headersConfig.Authorization = `Bearer ${accessToken}`;
		}

		return Object.keys(headersConfig).length ? headersConfig : null;
	} catch (error) {
		console.dir(error, "getHeaders");

		return error;
	}
};
