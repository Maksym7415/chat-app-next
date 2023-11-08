import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { SDRoot } from "./styles";
import Header from "./components/header";
import {
	SIDE_LEFT_TYPE_CONTENT,
	TYPES_FROM_TO_SEARCH_SCREEN,
} from "@/constants/general";
import Conversations from "@/screens/conversations/index";
import SearchPage from "@/screens/search";

const LeftSide = () => {
	// SELECTORS
	const sideLeftConfig = useSelector(
		({ appSlice }) => appSlice.sideLeftConfig,
	);

	// RENDERS
	const renderContent = useMemo(() => {
		const contentVariant = {
			[SIDE_LEFT_TYPE_CONTENT.conversations]: <Conversations />,
			[SIDE_LEFT_TYPE_CONTENT.searchContacts]: (
				<SearchPage
					params={{
						from: TYPES_FROM_TO_SEARCH_SCREEN.main,
					}}
				/>
			),
		};

		return contentVariant?.[sideLeftConfig.page] || null;
	}, [sideLeftConfig]);

	return (
		<SDRoot>
			<Header />
			{renderContent}
		</SDRoot>
	);
};
export default memo(LeftSide);
