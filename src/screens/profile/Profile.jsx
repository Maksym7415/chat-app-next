import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TYPES_CONVERSATIONS } from "../../@core/constants/general";
import { getNameShort } from "../../helpers";
import Header from "./components/header";
import MainInfo from "./components/mainInfo";

// STYLES
const classes = {
	container: "flex-1",
	scrollView: "overflow-y-auto p-[10px]",
};

const ProfilePage = ({ typeProfile, conversationData, closeDrawer }) => {
	// SELECTORS
	const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

	// STATES
	const [setting, setSetting] = useState({
		nameShort: "",
		avatar: "",
		conversationData: null,
		isOwnerProfile: false,
		typeProfile: TYPES_CONVERSATIONS.dialog,
		conversationName: "",
	});

	// USEEFFECTS
	useEffect(() => {
		let settingLocal = {
			typeProfile:
				typeProfile?.toLowerCase() || TYPES_CONVERSATIONS.dialog,
			nameShort: getNameShort(conversationData?.conversationName),
			conversationData: conversationData || null,
			avatar: conversationData?.conversationAvatar || "",
			conversationName: conversationData?.conversationName,
			isOwnerProfile: false,
		};

		setSetting((prev) => ({
			...prev,
			...settingLocal,
		}));
	}, [userInfo]);

	return (
		<div className={classes.container}>
			<Header
				setting={setting}
				closeDrawer={closeDrawer}
			/>
			<div className={classes.scrollView}>
				<MainInfo typeProfile={setting.typeProfile} />
			</div>
		</div>
	);
};

export default memo(ProfilePage);
