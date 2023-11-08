"use client";

import { memo, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import TopCenterComponent from "./components/topCenterComponent";
import TopLeftComponent from "./components/topLeftComponent";
import { SIDE_LEFT_TYPE_CONTENT } from "@/constants/general";
import { allActionsStore } from "@/store/rootActions";
import { SDRoot, SDTop } from "./styles";

const Header = ({ children }) => {
	// HOOKS
	const dispatch = useDispatch();
	const { t } = useTranslation("common");

	// SELECTORS
	const sideLeftConfig = useSelector(
		({ appSlice }) => appSlice.sideLeftConfig,
	);

	// STATES
	const [settings, setSettings] = useState({
		noSettings: true,
		topCenterComponent: {
			type: SIDE_LEFT_TYPE_CONTENT.searchContacts,
			placeholder: t("generals.search"),
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
						placeholder: t("generals.search"),
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
						type: SIDE_LEFT_TYPE_CONTENT.searchContacts,
						placeholder: t("generals.search"),
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
		<SDRoot>
			<SDTop>
				<TopLeftComponent />
				<TopCenterComponent
					parentSettings={settings.topCenterComponent}
				/>
			</SDTop>
			{children}
		</SDRoot>
	);
};

export default memo(Header);
