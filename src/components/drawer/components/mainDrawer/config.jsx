import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

export const languagesList = [
	{
		id: 1,
		label: "en",
		value: "en",
	},
	{
		id: 2,
		label: "ua",
		value: "ua",
	},
	{
		id: 3,
		label: "ru",
		value: "ru",
	},
];

export const drawerListKeysData = {
	profile: {
		key: "profile",
		id: 1,
		title: "profile",
		icon: <PersonIcon />,
	},
	newChat: {
		key: "newChat",
		id: 2,
		title: "newChat",
		icon: <GroupIcon />,
	},
	logout: {
		key: "logout",
		id: 3,
		title: "logout",
		icon: <ExitToAppIcon />,
	},
};

export const drawerList = [
	drawerListKeysData.profile,
	drawerListKeysData.newChat,
	drawerListKeysData.logout,
];
