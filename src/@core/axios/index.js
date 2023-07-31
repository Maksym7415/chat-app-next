/* eslint-disable no-underscore-dangle */

/* eslint-disable no-param-reassign */
// APPROVED +
import axios from "axios";
import { IS_CLIENT, langsData } from "@/constants/general";
// import { PATHS } from "@/constants/paths";
import Snackbar from "@/helpers/toastify";
// import { actionLogOut } from "@/store/store";

const parseErrorCode = (error) => {
	if (error?.response) {
		if (error.response?._response) {
			Snackbar.error(error.response?._response);
		}
		if (error.response.status === 401) {
			// actionLogOut(true);
		} else if (error.response.status === 403) {
			const { message } = error.response.data;

			// actionLogOut();

			// if (IS_CLIENT) {
			// 	window.open(
			// 		`${window.location.origin}${PATHS.signIn}`,
			// 		"_self",
			// 	);
			// }
			return Promise.reject({
				data: {
					message: message || error.response.data,
				},
			});
		} else if (error.response.status === 404) {
			const { message } = error.response.data;

			return Promise.reject({
				data: {
					message: message || error.response.data,
				},
			});
		}
	}

	if (error?.response) {
		return Promise.reject(error.response);
	}

	if (IS_CLIENT) {
		Snackbar.error(error.message);
		return Promise.reject({
			data: {
				message: error.message,
			},
		});
	}
	return Promise.reject({
		data: {
			message: error.message,
		},
	});
};

const API = axios.create();

const insertLocalInUrl = ({ url, locale }) => {
	if (locale === "en" || !langsData[locale] || url.includes(`/${locale}/`)) {
		return url;
	}

	const regex = /^(https?:\/\/[^/]+)(.*)$/i;
	const domain = url.replace(regex, "$1");
	const restUrl = url.replace(regex, "$2");
	const newUrl = `${domain}/${locale}${restUrl}`;

	return newUrl;
};

// Request parsing interceptor
API.interceptors.request.use(
	async (config) => {
		if (config.url.includes("http://")) {
			config.baseURL = "";

			const replaceHttps = config.url.replace("http://", "https://");

			config.url = insertLocalInUrl({
				locale: config?.locale || "",
				url: replaceHttps,
			});
		} else {
			config.baseURL = insertLocalInUrl({
				locale: config?.locale || "",
				url: process.env.BASE_URL_API,
			});
		}

		config.headers = {
			"Content-Type": "application/json",
			accept: "application/json",
			"X-Requested-With": "XMLHttpRequest",
			...config?.headers,
		};

		return config;
	},
	(error) => Promise.reject(error),
);

// Response parsing interceptor
API.interceptors.response.use(
	(response) => response,
	(error) => parseErrorCode(error),
);

export default API;
