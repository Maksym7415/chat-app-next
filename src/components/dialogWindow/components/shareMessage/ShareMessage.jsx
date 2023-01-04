import { useState } from "react";
import shallow from "zustand/shallow";
import { Typography, TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { shareMessageAction } from "../../../../reduxToolkit/app/slice";
import UserAvatar from "../../../avatar/userAvatar";
import { PATHS } from "@/core/constants/paths";
import useStyles from "./styles";
import languages from "@/core/translations";
import { useAppStore } from "@/storeZustand/app/store";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { useSettingStore } from "@/storeZustand/setting/store";

const SharedMessage = ({ data }) => {
  // HOOKS
  const classes = useStyles();
  const dispatch = useDispatch();

  const { lang } = useSettingStore(
    (state) => ({
      lang: state.lang,
    }),
    shallow
  );

  const { conversationsList } = useConversationsStore(
    (state) => ({
      conversationsList: state.conversationsList.data,
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
  const [searchNameChat, setSearchNameChat] = useState("");

  // VARIABLES
  const conversationsFiltered = Object.values(conversationsList).filter(
    (conversation) => conversation.conversationName.includes(searchNameChat)
  );

  // FUNCTIONS
  const handleChatNameHandler = (event) => {
    setSearchNameChat(event.target.value);
  };

  const handleShareMessageId = (conversationId) => {
    dispatch(shareMessageAction(data));
    // history.push({
    //   pathname: `${PATHS.chat}/${conversationId}`,
    //   state: {
    //     from: "shareMessage",
    //   },
    // });
    setDialogWindowClearConfigAction();
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
          conversationsFiltered.map((element) => (
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
