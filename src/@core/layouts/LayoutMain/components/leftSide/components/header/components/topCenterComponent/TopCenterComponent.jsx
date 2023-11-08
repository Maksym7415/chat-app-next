import { useCallback, useLayoutEffect, useMemo, useState } from "react";
// import SearchIcon from "public/icons/generals/search.svg";
import { useSelector } from "react-redux";
import { SDInputSearch, SDInputAdornmentLeft } from "./styles";
import { SIDE_LEFT_TYPE_CONTENT } from "@/constants/general";
import { useDebounce } from "@/hooks/useDebounce";
import { searchApi } from "@/store/search/api";

const TopCenterComponent = ({ parentSettings }) => {
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
			skip: parentSettings.type !== SIDE_LEFT_TYPE_CONTENT.searchContacts,
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
						<SDInputSearch
							value={search}
							onChange={onChangeText}
							placeholder={parentSettings.placeholder}
							startAdornment={
								<SDInputAdornmentLeft position="start">
									{/* <SearchIcon /> */}
									SearchIcon
								</SDInputAdornmentLeft>
							}
							onFocus={parentSettings.onFocus}
						/>
					);
				}
				return <></>;
			})()}
		</>
	);
};

export default TopCenterComponent;
