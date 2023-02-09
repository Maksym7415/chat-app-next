import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "@/components/avatar/userAvatar/index";
import languages from "@/core/translations";
import SelectsAsyncPaginateSearch from "@/components/SelectsAsyncPaginateSearch";
import { fullDate } from "@/helpers/index";
import Snackbar from "@/helpers/notistack";
import { socketEmitChatCreation } from "@/core/socket/actions/socketEmit";
import CustomButton from "@/components/buttons/customButton/index";
import { setDialogWindowClearConfigAction } from "../../redux/slice";
import { searchApi } from "@/services/search/serviceRedux";

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

// rework style

const NewChat = () => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);

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
            const params = {};

            const searchParams = searchQuery || "";
            const offsetParams = page !== 1 ? (page - 1) * 10 : 0;

            if (searchParams) {
              params.searchRequest = searchParams;
            }
            if (offsetParams) {
              params.offset = offsetParams;
            }

            let response = {
              data: {
                response: [],
                limit: 0,
              },
            };

            try {
              response = await dispatch(
                searchApi.endpoints.getSearchContacts.initiate({ params })
              );
            } catch (error) {}
            console.log(params, "params");
            console.log(response, "response");
            return {
              options: response?.data?.response || [],
              limit: response?.data?.limit || 0,
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
