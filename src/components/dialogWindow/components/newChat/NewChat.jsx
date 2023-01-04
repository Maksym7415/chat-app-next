"use client";

import React, { useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import UserAvatar from "../../../avatar/userAvatar";
import languages from "@/core/translations";
import SelectsAsyncPaginateSearch from "../../../SelectsAsyncPaginateSearch";
import { fullDate } from "../../../../helpers";
import Snackbar from "@/helpers/notistack";
import { socketEmitChatCreation } from "@/core/socket/actions/socketEmit";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useSettingStore } from "@/storeZustand/setting/store";
import shallow from "zustand/shallow";
import { useSearchStore } from "@/storeZustand/search/store";
import { useAppStore } from "@/storeZustand/app/store";
import CustomButton from "@/components/buttons/customButton/index";

// makeStyles
// STYLES
const classes = {
  container: "m-[0px] px-[10px] py-[20px] h-full flex flex-col",
  wrapperContact: "flex px-[10px] py-[5px] cursor-pointer rounded-[20px]",
  wrapperInfo: "pl-[20px]",
  fullName: "text-[16px] m-[0px] line-camp-1",
  login: "m-[0px] mt-[3px] text-[12px] line-camp-1",
  avatarView: "",
  containerSelect: "",
};

const NewChat = () => {
  // HOOKS
  const classes = useStyles();
  const dispatch = useDispatch();

  // SELECTORS
  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

  const { authToken } = useAuthStore(
    (state) => ({
      authToken: state.authToken,
    }),
    shallow
  );

  const { getSearchContactRequest } = useSearchStore(
    (state) => ({
      getSearchContactRequest: state.getSearchContactRequest,
    }),
    shallow
  );

  const { setDialogWindowClearConfigAction } = useAppStore(
    (state) => ({
      setDialogWindowClearConfigAction: state.setDialogWindowClearConfigAction,
    }),
    shallow
  );

  // STATES
  const [selectedContacts, setSelectedContacts] = useState([]);

  // FUNCTIONS
  const createChat = () => {
    if (!selectedContacts.length) {
      return Snackbar.error("No selected contacts");
    }

    const data = [
      ...selectedContacts.map((item) => ({
        id: item.id,
        firstName: item.firstName,
      })),
      { id: authToken.userId, firstName: authToken.firstName, isAdmin: true },
    ];

    socketEmitChatCreation({
      data: data,
      date: fullDate(new Date()),
      chatName: "Chat",
      imageData: {},
      imageFormat: "",
      cb: () => {
        setDialogWindowClearConfigAction();
        return Snackbar.success("Create new chat");
      },
    });
  };

  return (
    <Grid container className={classes.container}>
      <SelectsAsyncPaginateSearch
        setSelected={(selected) => {
          setSelectedContacts(selected);
        }}
        selected={selectedContacts}
        settings={{
          isMulti: true,
          getSearchRequest: async (searchQuery, page) => {
            const response = await getSearchContactRequest({
              params: {
                search: searchQuery,
                offset: page !== 1 ? (page - 1) * 10 : 0,
              },
            });

            console.log(response, "response");
            return {
              options: response.response,
              limit: response.limit,
            };
          },
          getOptionValue: (option) => option.id,
          getOptionLabel: (option) => (
            <Box
              component="li"
              className={classes.wrapperContact}
              key={option.id}
            >
              <div className={classes.avatarView}>
                <UserAvatar
                  source={option.userAvatar}
                  status={[1, 3].includes(option.id) ? "online" : ""}
                  name={option.fullName}
                  sizeAvatar={38}
                />
              </div>
              <div className={classes.wrapperInfo}>
                <p className={classes.fullName}>{option.fullName}</p>
                <p className={classes.login}>{option.login}</p>
              </div>
            </Box>
          ),
          className: classes.containerSelect,
        }}
        placeholder={"Select contact"}
        styles={{
          root: {
            marginLeft: 15,
            paddingBottom: 10,
          },
        }}
      />
      <CustomButton
        onClick={createChat}
        style={{ margin: "10px auto 0", width: "100%", maxWidth: "200px" }}
      >
        {languages[lang].generals.createAChat}
      </CustomButton>
    </Grid>
  );
};

export default NewChat;
