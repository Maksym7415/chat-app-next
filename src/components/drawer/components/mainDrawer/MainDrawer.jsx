import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { ListItemIcon, ListItemText, List, ListItem } from "@mui/material";
import * as config from "./config";
import { PATHS } from "@/core/constants/paths";
import { actionLogOut } from "@/actions/index";
import BaseSelect from "../../../selects/BaseSelect";
import { setDialogWindowConfigAction } from "../../../dialogWindow/redux/slice";
import { setModalConfigAction } from "@/components/modal/redux/slice";
import { userApi } from "@/rtkQuery/user/serviceRedux";

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

    if (selectLang === lang) {
      return;
    }

    const sendData = { lang: selectLang };

    putUpdateProfileData(sendData)
      .unwrap()
      .then(() => {
        enqueueSnackbar("Success change language", { variant: "success" });
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
