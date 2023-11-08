"use client";

import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import BaseSelect from "../../../selects/BaseSelect";
import * as config from "./config";
import { PATHS } from "@/constants/paths";
import { allActionsStore } from "@/store/rootActions";
import { actionLogOut } from "@/store/store";
import { userApi } from "@/store/user/api";
import { SDWLangs, SDListItem } from "./styles";

function MainDrawer({ closeDrawer }) {
	// HOOKS
	const router = useRouter();
	const dispatch = useDispatch();
	const { t } = useTranslation("common");
	const { enqueueSnackbar } = useSnackbar();

	// SELECTORS
	const lang = useSelector(({ settingSlice }) => settingSlice.lang);

	// API
	const [putUpdateProfileData] = userApi.usePutUpdateProfileDataMutation();

	// FUNCTIONS
	const handleMenuAction = async (key) => {
		closeDrawer();

		switch (key) {
			case config.drawerListKeysData.profile.key:
				// eslint-disable-next-line no-case-declarations
				const timerShowModal = setTimeout(() => {
					dispatch(
						allActionsStore.setModalConfigAction({
							open: true,
							renderContent: "settingProfile",
							styles: {},
						}),
					);

					clearTimeout(timerShowModal);
				}, 100);

				return key;
			case config.drawerListKeysData.newChat.key:
				dispatch(
					allActionsStore.setDialogWindowConfigAction({
						open: true,
						typeContent: "newChat",
						title: t("generals.newChat"),
						data: [],
					}),
				);

				return key;
			case config.drawerListKeysData.logout.key:
				await actionLogOut();
				router.push(PATHS.signIn);

				return key;
			default:
				return key;
		}
	};

	const handleSetLanguage = (event) => {
		const selectLang = event.target.value;

		if (selectLang === lang) {
			return;
		}

		const sendData = { lang: selectLang };

		putUpdateProfileData(sendData)
			.unwrap()
			.then(() => {
				enqueueSnackbar(t("generals.successChangeLanguage"), {
					variant: "success",
				});
			});
	};

	return (
		<>
			<List>
				{config.drawerList.map((item) => {
					const icon = item?.icon || null;
					const id = item?.id || null;
					const title = item?.title || null;
					const key = item?.key || null;

					return (
						<SDListItem
							key={id}
							onClick={() => handleMenuAction(key)}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText primary={t(title)} />
						</SDListItem>
					);
				})}
			</List>
			<SDWLangs>
				<BaseSelect
					selectSetting={{
						label: "language",
						selected: lang,
						options: config.languagesList,
						handleChange: handleSetLanguage,
					}}
				/>
			</SDWLangs>
		</>
	);
}

export default MainDrawer;
