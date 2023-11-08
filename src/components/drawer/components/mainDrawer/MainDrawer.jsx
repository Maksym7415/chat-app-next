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
	const handleMenuAction = async (value) => {
		closeDrawer();

		switch (value) {
			case config.drawerListValues.newChat:
				dispatch(
					allActionsStore.setDialogWindowConfigAction({
						open: true,
						typeContent: "newChat",
						title: t("generals.newChat"),
						data: [],
					}),
				);

				return value;
			case config.drawerListValues.myProfile:
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
				return value;
			case config.drawerListValues.logout:
				await actionLogOut();
				router.push(PATHS.signIn);
				return value;
			default:
				return value;
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
				{config.drawerList.map(({ icon, id, title, value }) => (
					<SDListItem
						key={id}
						onClick={() => handleMenuAction(value)}
					>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={t(title)} />
					</SDListItem>
				))}
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
