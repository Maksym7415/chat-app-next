import { useEffect, useState } from "react";
import useStyles from "./styles";
import Header from "./components/header";
import MainInfo from "./components/mainInfo";
import { TYPES_CONVERSATIONS } from "../../config/constants/general";
import { getNameShort } from "../../helpers";
import { useAppStoreSelector } from "../../hooks/redux";

const ProfilePage = ({ typeProfile, conversationData, closeDrawer }: any) => {
  // HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useAppStoreSelector(({ settingSlice }) => settingSlice.lang);
  const { userInfo } = useAppStoreSelector(({ userSlice }) => userSlice);

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
      typeProfile: typeProfile?.toLowerCase() || TYPES_CONVERSATIONS.dialog,
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
      <Header setting={setting} closeDrawer={closeDrawer} />
      <div className={classes.scrollView}>
        <MainInfo typeProfile={setting.typeProfile} />
      </div>
    </div>
  );
};

export default React.memo(ProfilePage);
