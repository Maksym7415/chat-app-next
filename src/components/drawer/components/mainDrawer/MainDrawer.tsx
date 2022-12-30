import React from "react";
import { useHistory } from "react-router-dom";
import { ListItemIcon, ListItemText, List, ListItem } from "@mui/material";
import * as config from "./config";
import useStyles from "./styles";
import { Paths } from "../../../../routing/config/paths";
import { actionLogOut } from "../../../../actions";
import BaseSelect from "../../../selects/BaseSelect";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setDialogWindowConfigAction } from "../../../dialogWindow/redux/slice";
import {
  putUpdateProfileRequest,
  getUserProfileDataRequest,
} from "../../../../reduxToolkit/user/requests";
import { setLangAction } from "../../../../reduxToolkit/setting/slice";
import { setModalConfigAction } from "../../../../components/modal/redux/slice";

// need ts

function MainDrawer({ closeDrawer }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const userInfo = useAppSelector(({ userSlice }) => userSlice.userInfo);

  // FUNCTIONS
  const handleMenuAction = (value: string) => {
    closeDrawer();

    switch (value) {
      case "newChat":
        dispatch(
          setDialogWindowConfigAction({
            open: true,
            typeContent: "newChat",
            title: "New Chat",
            data: [],
          })
        );
        return;
      case "myProfile":
        const timerShowModal = setTimeout(() => {
          dispatch(
            setModalConfigAction({
              open: true,
              renderContent: "settingProfile",
              styles: {},
            })
          );
          clearTimeout(timerShowModal);
        }, 100);
        return;
      case "logout":
        dispatch(actionLogOut());
        history.push(Paths.signIn);
        return;
      default:
        return null;
    }
  };

  const handleSetLanguage = (event: any) => {
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
