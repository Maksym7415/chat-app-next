import React from "react";
import { ListItemIcon, ListItemText, List, ListItem } from "@mui/material";
import * as config from "./config";
import useStyles from "./styles";
import { PATHS } from "@/config/constants/paths";
import { actionLogOut } from "@/actions/index";
import BaseSelect from "../../../selects/BaseSelect";
import {
  putUpdateProfileRequest,
  getUserProfileDataRequest,
} from "@/store/user/requests";
import { setLangAction } from "@/store/setting/slice";
import { useAppStore } from "@/storeZustand/app/store";
import { useUserStore } from "@/storeZustand/user/store";
import { useSettingStore } from "@/storeZustand/setting/store";
import shallow from "zustand/shallow";

function MainDrawer({ closeDrawer }) {
  // HOOKS
  const classes = useStyles();

  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
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
        dispatch(actionLogOut());
        // history.push(PATHS.signIn);
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
    dispatch(
      putUpdateProfileRequest({
        data: sendData,
        cb: () => {
          dispatch(
            getUserProfileDataRequest({
              cb: () => {
                dispatch(setLangAction(selectLang));
              },
            })
          );
        },
      })
    );
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
