import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ListItemIcon, ListItemText, List, ListItem } from "@mui/material";
import * as config from "./config";
import { PATHS } from "@/core/constants/paths";
import { actionLogOut } from "@/actions/index";
import BaseSelect from "../../../selects/BaseSelect";
import { setDialogWindowConfigAction } from "../../../dialogWindow/redux/slice";
import { setLangAction } from "@/store/setting/slice";
import { setModalConfigAction } from "@/components/modal/redux/slice";
import { UserService } from "@/services/user/user.service";
import {
  PutUpdateProfileDataQuery,
  getFetchUserProfileDataQuery,
} from "@/services/user/service";

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

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userInfo = useSelector(({ userSlice }) => userSlice.userInfo);

  console.log(userInfo, "userInfo");
  console.log(lang, "lang");

  // STATES
  const [selectedLang, setSelectedLang] = useState("");

  const { mutate } = PutUpdateProfileDataQuery({
    cb: async () => {
      await getFetchUserProfileDataQuery();
    },
  });

  // FUNCTIONS
  const handleMenuAction = (value) => {
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
        actionLogOut();
        router.push(PATHS.signIn);
        return;
      default:
        return null;
    }
  };

  const handleSetLanguage = (event) => {
    const selectLang = event.target.value;

    console.log(lang, "langUser");
    console.log(selectLang, "selectLang");

    if (selectLang === lang) {
      return;
    }

    setSelectedLang(selectLang);

    const sendData = { lang: selectLang };

    mutate({ data: sendData });

    // UserService.putUpdateProfile({
    //   data: sendData,
    //   cb: () => {
    //     UserService.getUserProfileData({
    //       cb: () => {
    //         setLangAction(selectLang);
    //       },
    //     });
    //   },
    // });
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
