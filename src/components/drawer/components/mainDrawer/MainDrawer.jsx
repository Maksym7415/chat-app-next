import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import BaseSelect from "../../../selects/BaseSelect";
import * as config from "./config";
import { PATHS } from "@/core/constants/paths";
import { allActionsStore } from "@/store/rootActions";
import { actionLogOut } from "@/store/store";
import { userApi } from "@/store/user/api";

// STYLES
const classes = {
	list: "",
	wrapperLangs: "p-[15px]",
	listItem: "w-full cursor-pointer",
};

function MainDrawer({ closeDrawer }) {
	// HOOKS
	const router = useRouter();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	// SELECTORS
	const lang = useSelector(({ settingSlice }) => settingSlice.lang);

	const [putUpdateProfileData] = userApi.usePutUpdateProfileDataMutation();

	// FUNCTIONS
	const handleMenuAction = (value) => {
		closeDrawer();

		switch (value) {
			case "newChat":
				dispatch(
					allActionsStore.setDialogWindowConfigAction({
						open: true,
						typeContent: "newChat",
						title: "New Chat",
						data: [],
					}),
				);

				return;
			case "myProfile":
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
				return;
			case "logout":
				actionLogOut();
				router.push(PATHS.signIn);
				return;
			default:
				return null;
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
				enqueueSnackbar("Success change language", {
					variant: "success",
				});
			});
	};

	return (
		<>
			<List className={classes.list}>
				{config.drawerList.map(({ icon, id, title, value }) => {
					return (
						<ListItem
							key={id}
							onClick={() => handleMenuAction(value)}
							className={classes.listItem}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText primary={title} />
						</ListItem>
					);
				})}
			</List>
			<div className={classes.wrapperLangs}>
				<BaseSelect
					selectSetting={{
						label: "language",
						selected: lang,
						options: config.languagesList,
						handleChange: handleSetLanguage,
					}}
				/>
			</div>
		</>
	);
}

export default MainDrawer;
