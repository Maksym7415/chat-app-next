import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopCenterComponent from "./components/topCenterComponent";
import TopLeftComponent from "./components/topLeftComponent";
import { SIDE_LEFT_TYPE_CONTENT } from "@/core/constants/general";
import { allActionsStore } from "@/store/rootActions";

// STYLES
const classes = {
	container: "px-[8px] py-[15px]",
	containerTop: "flex",
	wrapperTopCenterComponent: "flex",
};

const Header = ({ children }) => {
	// HOOKS
	const dispatch = useDispatch();

	// SELECTORS
	const sideLeftConfig = useSelector(
		({ appSlice }) => appSlice.sideLeftConfig,
	);

	// STATES
	const [settings, setSettings] = useState({
		noSettings: true,
		topCenterComponent: {
			type: "searchContacts",
			placeholder: "Search",
			getRequest: () => {
				console.log("Search getRequest");
			},
			styles: {
				headerLayout: {},
			},
		},
	});

	// FUNCTIONS
	const newSideLeftConfigSet = () => {
		switch (sideLeftConfig.page) {
			case SIDE_LEFT_TYPE_CONTENT.conversations:
				return setSettings(() => ({
					topCenterComponent: {
						placeholder: "Search",
						onFocus: () => {
							dispatch(
								allActionsStore.setSideLeftConfigAction({
									page: SIDE_LEFT_TYPE_CONTENT.searchContacts,
								}),
							);
						},
					},
				}));

			case SIDE_LEFT_TYPE_CONTENT.searchContacts:
				return setSettings(() => ({
					topCenterComponent: {
						placeholder: "Search",
						type: "searchContacts",
						getRequest: (options) => {
							dispatch(
								allActionsStore.setSearchContactsAction({
									search: options.params.search,
									offset: 0,
									direction: "",
									limit: 0,
								}),
							);
						},
					},
				}));
			default:
				return null;
		}
	};

	// USEEFFECTS
	useEffect(() => {
		// set setting options from screen
		newSideLeftConfigSet();
	}, [sideLeftConfig]);

	return (
		<div className={classes.container}>
			<div className={`${classes.containerTop} flex`}>
				<TopLeftComponent />
				<div className={classes.wrapperTopCenterComponent}>
					<TopCenterComponent
						parentSettings={settings.topCenterComponent}
					/>
				</div>
			</div>
			{children}
		</div>
	);
};

export default memo(Header);
