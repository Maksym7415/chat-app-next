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
		switch (sideLeftConfig.page) {
			case SIDE_LEFT_TYPE_CONTENT.conversations:
				return <Conversations />;
			case SIDE_LEFT_TYPE_CONTENT.searchContacts:
				return (
					<SearchPage
						params={{
							from: TYPES_FROM_TO_SEARCH_SCREEN.main,
						}}
					/>
				);
			default:
				return <></>;
		}
	}, [sideLeftConfig]);

	return (
		<SDRoot>
			<Header />
			{renderContent}
		</SDRoot>
	);
};
export default memo(LeftSide);
