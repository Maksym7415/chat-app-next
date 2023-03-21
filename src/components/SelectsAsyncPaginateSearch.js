import { AsyncPaginate } from "react-select-async-paginate";

const customStylesSelect = (styles) => ({
	container: (provided) => ({
		...provided,
		...styles?.container,
	}),
	option: (provided) => ({
		...provided,
		...styles?.option,
	}),
	control: (provided) => ({
		...provided,
		minWidth: 200,
		width: "100%",
		...styles?.control,
	}),
	singleValue: (provided) => {
		const transition = "opacity 300ms";
		return { ...provided, transition };
	},
});

function SelectsAsyncPaginateSearch({
	setSelected,
	selected,
	settings,
	styles,
	placeholder = "Select",
}) {
	// FUNCTIONS
	const loadOptions = async (searchQuery, loadedOptions, { page }) => {
		const returnData = {
			options: [],
			hasMore: false,
			additional: {
				page,
			},
		};

		try {
			const payload = await settings.getSearchRequest(searchQuery, page);
			const count = payload?.count || payload?.limit;

			if (!payload?.options || !count) return returnData;

			let hasMore = false;

			if (payload?.limit) {
				hasMore =
					loadedOptions.length + payload.options.length >=
					payload.limit;
			} else {
				hasMore =
					loadedOptions.length + payload.options.length <
					payload?.count;
			}

			return {
				...returnData,
				options: payload.options || [],
				hasMore,
				additional: {
					page: page + 1,
				},
			};
		} catch (error) {
			return returnData;
		}
	};

	let settingsAsyncPaginate = {};
	if (settings) {
		const {
			getOptionValue,
			getOptionLabel,
			getSearchRequest,
			...otherSettings
		} = settings;
		if (getOptionValue)
			settingsAsyncPaginate.getOptionValue = getOptionValue;
		if (getOptionLabel)
			settingsAsyncPaginate.getOptionLabel = getOptionLabel;
		if (getSearchRequest) settingsAsyncPaginate.loadOptions = loadOptions;
		settingsAsyncPaginate = { ...settingsAsyncPaginate, ...otherSettings };
	}

	const onChange = (selectedOptions) => {
		setSelected(selectedOptions);
	};

	return (
		<AsyncPaginate
			debounceTimeout={700}
			styles={customStylesSelect(styles)}
			value={selected}
			onChange={onChange}
			placeholder={placeholder}
			additional={{
				page: 1,
			}}
			{...settingsAsyncPaginate}
		/>
	);
}

export default SelectsAsyncPaginateSearch;
