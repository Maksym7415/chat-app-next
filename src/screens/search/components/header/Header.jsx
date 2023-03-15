import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

// rework

const Header = ({ getRequest }) => {
	// HOOKS

	// STATES
	const [search] = useState("");

	// CUSTOM HOOKS
	const debouncedSearchValue = useDebounce(search, 300);

	// USEEFFECTS
	useEffect(() => {
		getRequest &&
			getRequest({
				params: {
					search: debouncedSearchValue,
				},
			});
	}, [debouncedSearchValue]);

	return <></>;
};

export default Header;
