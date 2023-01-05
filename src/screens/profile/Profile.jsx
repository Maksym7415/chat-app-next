"use client";

import { useEffect, useState, memo } from "react";
import shallow from "zustand/shallow";
import Header from "./components/header";
import MainInfo from "./components/mainInfo";
import { TYPES_CONVERSATIONS } from "../../@core/constants/general";
import { getNameShort } from "../../helpers";
import { useSettingStore } from "@/storeZustand/setting/store";
import { useUserStore } from "@/storeZustand/user/store";

// STYLES
const classes = {
  container: "flex-1",
  scrollView: "overflow-y-auto p-[10px]",
};

const ProfilePage = ({ typeProfile, conversationData, closeDrawer }) => {
  // STORE
  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

  const { userInfo } = useUserStore(
    (state) => ({
      userAvatars: state.userInfo,
    }),
    shallow
  );

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

export default memo(ProfilePage);
