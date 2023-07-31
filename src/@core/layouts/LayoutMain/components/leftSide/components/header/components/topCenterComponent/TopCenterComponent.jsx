import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { useSelector } from "react-redux";
import { SIDE_LEFT_TYPE_CONTENT } from "@/constants/general";
import { useDebounce } from "@/hooks/useDebounce";
import { searchApi } from "@/store/search/api";

// STYLES
const classes = {
	inputSearch: "w-full max-w-[240px] p-[0] pl-[5px] rounded-[20px] h-[40px]",
};

function TopCenterComponent({ parentSettings }) {
	// SELECTORS
	const sideLeftConfig = useSelector(
		({ appSlice }) => appSlice.sideLeftConfig,
	);

	// STATES
	const [search, setSearch] = useState("");

	// CUSTOM HOOKS
	const debouncedSearchValue = useDebounce(search, 300);

	// VARIABLES
	const params = useMemo(() => {
		const paramsLoc = {};
		const searchLoc = debouncedSearchValue;

		if (searchLoc) {
			paramsLoc.search = searchLoc;
		}

		return paramsLoc;
	}, [debouncedSearchValue]);

	// API
	searchApi.useGetSearchContactsQuery(
		{
			params: {
				searchRequest: params.search,
			},
		},
		{
			skip: parentSettings.type !== "searchContacts",
		},
	);

	// FUNCTIONS
	const onChangeText = useCallback((e) => {
		setSearch(e.target.value);
	}, []);

	const getRequest = () => {
		parentSettings.getRequest &&
			parentSettings.getRequest({
				params,
			});
	};

	// USEEFFECTS
	useLayoutEffect(() => {
		getRequest();
	}, [debouncedSearchValue]);

	return (
		<>
			{(() => {
				if (
					[
						SIDE_LEFT_TYPE_CONTENT.conversations,
						SIDE_LEFT_TYPE_CONTENT.searchContacts,
					].includes(sideLeftConfig.page)
				) {
					return (
						<OutlinedInput
							id="outlined-adornment-weight"
							value={search}
							onChange={onChangeText}
							placeholder={parentSettings.placeholder}
							className={classes.inputSearch}
							startAdornment={
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							}
							onFocus={parentSettings.onFocus}
						/>
					);
				}
				return <></>;
			})()}
		</>
	);
}

export default TopCenterComponent;
