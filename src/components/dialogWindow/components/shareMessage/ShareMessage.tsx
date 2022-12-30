import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Box } from "@mui/material";
import { shareMessageAction } from "../../../../reduxToolkit/app/slice";
import UserAvatar from "../../../avatar/userAvatar";
import { Paths } from "../../../../routing/config/paths";
import useStyles from "./styles";
import languages from "../../../../config/translations";
import { setDialogWindowClearConfigAction } from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

// need ts

const SharedMessage = ({ data }: any) => {
  // HOOKS
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );

  // STATES
  const [searchNameChat, setSearchNameChat] = React.useState<string>("");

  // VARIABLES
  const conversationsFiltered = Object.values(conversationsList).filter(
    (conversation: any) =>
      conversation.conversationName.includes(searchNameChat)
  );

  // FUNCTIONS
  const handleChatNameHandler = (event: any) => {
    setSearchNameChat(event.target.value);
  };

  const handleShareMessageId = (conversationId: number) => {
    dispatch(shareMessageAction(data));
    history.push({
      pathname: `${Paths.chat}/${conversationId}`,
      state: {
        from: "shareMessage",
      },
    });
    dispatch(setDialogWindowClearConfigAction());
  };

  return (
    <div className={classes.container}>
      <TextField
        id="name"
        variant="outlined"
        size="small"
        placeholder={`${languages[lang].generals.shareMessageWith}...`}
        className={classes.inputFilter}
        onChange={handleChatNameHandler}
      />
      <div className={classes.wrapperConversation}>
        {conversationsFiltered.length ? (
          conversationsFiltered.map((element: any) => (
            <div
              onClick={() => handleShareMessageId(element.conversationId)}
              className={classes.conversation}
              key={element.conversationId}
            >
              <UserAvatar
                source={element.conversationAvatar}
                name={element.conversationName}
                sizeAvatar={38}
              />
              <div className={classes.info}>
                <Typography className={classes.name} variant="subtitle1">
                  {element.conversationName}
                </Typography>
                <Typography variant="caption" className={classes.messageText}>
                  {element.conversationType}
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <Box className={classes.noUsersFound}>
            <Typography className={classes.noUsersFoundText}>
              {languages[lang].generals.noUsersFound}.
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default SharedMessage;
