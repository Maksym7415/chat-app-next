"use client";

import { useRouter } from "next/navigation";
import { ListItemIcon, ListItemText, List, ListItem } from "@mui/material";
import shallow from "zustand/shallow";
import * as config from "./config";
import { PATHS } from "@/core/constants/paths";
import { actionLogOut } from "@/actions/index";
import BaseSelect from "../../../selects/BaseSelect";
import { useAppStore } from "@/storeZustand/app/store";
import { useUserStore } from "@/storeZustand/user/store";
import { useSettingStore } from "@/storeZustand/setting/store";
import { UserService } from "@/services/user/user.service";

// STYLES
const classes = {
  list: "",
  wrapperLangs: "p-[15px]",
  listItem: "w-full",
};

function MainDrawer({ closeDrawer }) {
  // HOOKS
  const router = useRouter();

  const { lang, setLangAction } = useSettingStore(
    (state) => ({
      lang: state.lang,
      setLangAction: state.setLangAction,
    }),
    shallow
  );

  const { userInfo } = useUserStore(
    (state) => ({
      userInfo: state.userInfo,
    }),
    shallow
  );

  const { setModalConfigAction, setDialogWindowConfigAction } = useAppStore(
    (state) => ({
      setModalConfigAction: state.setModalConfigAction,
      setDialogWindowConfigAction: state.setDialogWindowConfigAction,
    }),
    shallow
  );

  // FUNCTIONS
  const handleMenuAction = (value) => {
    closeDrawer();

    switch (value) {
      case "newChat":
        setDialogWindowConfigAction({
          open: true,
          typeContent: "newChat",
          title: "New Chat",
          data: [],
        });

        return;
      case "myProfile":
        const timerShowModal = setTimeout(() => {
          setModalConfigAction({
            open: true,
            renderContent: "settingProfile",
            styles: {},
          });

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
    const langUser = userInfo.lang;
    const selectLang = event.target.value;

    if (selectLang === langUser) {
      return;
    }

    const sendData = { lang: selectLang };

    UserService.putUpdateProfile({
      data: sendData,
      cb: () => {
        UserService.getUserProfileData({
          cb: () => {
            setLangAction(selectLang);
          },
        });
      },
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
