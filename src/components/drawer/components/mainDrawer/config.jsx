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

export const drawerListValues = {
	myProfile: "myProfile",
	newChat: "newChat",
	logout: "logout",
}; 

export const drawerList = [
	{
		id: 1,
		title: "profile",
		icon: <PersonIcon />,
		value: drawerListValues.myProfile,
	},
	{
		id: 2,
		title: "newChat",
		icon: <GroupIcon />,
		value: drawerListValues.newChat
	},
	{
		id: 3,
		title: "logout",
		icon: <ExitToAppIcon />,
		value: drawerListValues.logout
	},
];
