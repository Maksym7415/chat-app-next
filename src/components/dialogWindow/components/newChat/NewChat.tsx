import React, { useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import useStyles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getSearchContactRequest } from "../../../../reduxToolkit/search/requests";
import UserAvatar from "../../../avatar/userAvatar";
import languages from "../../../../config/translations";
import SelectsAsyncPaginateSearch from "../../../SelectsAsyncPaginateSearch";
import { fullDate } from "../../../../helpers";
import Snackbar from "../../../../helpers/notistack";
import { setDialogWindowClearConfigAction } from "../../redux/slice";
import { socketEmitChatCreation } from "../../../../config/socket/actions/socketEmit";

// need ts

const NewChat = () => {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const authToken = useAppSelector(({ authSlice }) => authSlice.authToken);

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
        dispatch(setDialogWindowClearConfigAction());
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
            const response = await dispatch(
              getSearchContactRequest({
                params: {
                  search: searchQuery,
                  offset: page !== 1 ? (page - 1) * 10 : 0,
                },
              })
            );
            return {
              options: response.payload.response,
              limit: response.payload.limit,
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
      <Button
        autoFocus
        className={classes.createChatButton}
        variant="contained"
        onClick={createChat}
      >
        {languages[lang].generals.createAChat}
      </Button>
    </Grid>
  );
};

export default NewChat;
