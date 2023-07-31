const initial = {
	fullParamsString: "",
	excludesParamsString: "",
	fullParamsAndString: "",
	excludesParamsAndString: ""
};

export const getParamsStringUrl = ({ queryParams, excludesKey = [] }) => {
	if (!queryParams || !Object.keys(queryParams).length) {
		return initial;
	}

	let excludesParamsString = "";
	let fullParamsString = "";
	Object.keys(queryParams).map((key) => {
		if (queryParams[key]) {
			if (Array.isArray(queryParams[key])) {
				queryParams[key].map((el) => {
					fullParamsString += `${
						!fullParamsString ? "" : "&"
					}${key}=${el}`;

					if (!excludesKey.includes(key)) {
						excludesParamsString += `${
							!excludesParamsString ? "" : "&"
						}${key}=${el}`;
					}

					return el;
				});
			} else {
				if (queryParams[key]) {
					fullParamsString += `${
						!fullParamsString ? "" : "&"
					}${key}=${queryParams[key]}`;

					if (!excludesKey.includes(key)) {
						excludesParamsString += `${
							!excludesParamsString ? "" : "&"
						}${key}=${queryParams[key]}`;
					}
				}
			}
		}
		return key;
	});

	if (fullParamsString) {
		return {
			...initial,
			fullParamsString: `?${fullParamsString}`,
			excludesParamsString: `?${excludesParamsString}`,
			fullParamsAndString: fullParamsString ? `&${fullParamsString}` : "",
			excludesParamsAndString: excludesParamsString
				? `&${excludesParamsString}`
				: "",
		};
	}

	return initial;
};
