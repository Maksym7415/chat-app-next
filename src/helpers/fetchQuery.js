import { langsData } from "@/constants/general";

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

export const fetchQuery = async ({
	params = {},
	url = "",
	token = "",
	method = "GET",
	locale = "en",
}) => {
	const urlFull = new URL(`${process.env.BASE_URL_API}${url}`);
	const headers = {
		"Content-Type": "application/json",
	};
	if (token) {
		headers.Authorization = token;
	}
	Object.keys(params).forEach((key) => {
		if (Array.isArray(params[key])) {
			params[key].map((el) => {
				urlFull.searchParams.append(key, el);

				return el;
			});
		} else {
			if (params[key]) {
				urlFull.searchParams.append(key, params[key]);
			}
		}
	});

	try {
		const resQuery = await fetch(
			insertLocalInUrl({
				locale,
				url: urlFull,
			}),
			{
				method,
				headers,
			},
		);

		const data = await resQuery?.json();

		return {
			data,
			response: resQuery,
		};
	} catch (error) {
		return {
			data: null,
			error,
		};
	}
};
