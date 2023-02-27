import { useState, useEffect } from "react";
import clsx from "clsx";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  socketEmitChatsTypingState,
  socketEmitSendMessage,
} from "@/core/socket/actions/socketEmit";
import languages from "@/core/translations/index";
import { fullDate } from "@/helpers/index";
import RightInputComponent from "./components/RightInputComponent";
import LeftInputComponent from "./components/LeftInputComponent";
import MessageEdit from "./components/messageEdit";
import SharedMessages from "./components/sharedMessages";
import { allActionsStore } from "@/store/rootActions";

// STYLES
const classes = {
  root: "w-full",
  wrapperInput: "flex flex-1 p-[0px] bg-white items-center",
  input: "flex flex-1 m-[0px] px-[10px] bg-white max-h-[100px]",
};

const MessageInput = ({ conversationId, opponentId }) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const typing = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationTypeState
  );
  const messageEdit = useSelector(({ appSlice }) => appSlice.messageEdit);
  const forwardMessages = useSelector(
    ({ appSlice }) => appSlice.forwardMessages
  );
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);

  // VARIABLES
  const textPlaceholderInput = `${languages[lang].generals.typeMessage}...`;
  const userId = authToken.userId;
  const firstName = authToken.firstName;

  // STATES
  const [sheredMessages, setSharedMessages] = useState([]);
  const [message, setMessage] = useState({ 0: "" });

  // FUNCTIONS
  const handleChangeMessage = (e) => {
    setMessage({ ...message, [conversationId]: e.target.value });
    const user = {
      userId,
      firstName,
      conversationId,
      isTyping: false,
    };
    if (!typing[conversationId]) {
      socketEmitChatsTypingState(user, conversationId);
    } else {
      socketEmitChatsTypingState(user, null);
    }
  };

  const sendMessage = (id, messageSend, forwardedFromId) => {
    const body = {
      id,
      messageSend,
      forwardedFromId,
      opponentId,
      conversationId,
      setMessage,
    };
    socketEmitSendMessage(body);
  };

  const handleSendMessage = () => {
    if (!message[conversationId] && !sheredMessages.length) return;
    const messageSend = {
      message: message?.message || message[conversationId],
      fkSenderId: message?.User?.id || userId,
      messageType: "Text",
    };

    if (!conversationId) {
      return sendMessage(null, messageSend, null);
    }

    if (sheredMessages.length) {
      sheredMessages.map((message) => {
        const messageObj = {
          ...message,
        };
        sendMessage(conversationId, messageObj, message.User.id);
        return message;
      });
      dispatch(allActionsStore.shareMessageAction([]));
    }
    if (message[conversationId]) {
      if (messageEdit.messageId) {
        sendMessage(conversationId, messageSend, null);
      } else {
        messageSend.sendDate = fullDate(new Date());
        sendMessage(conversationId, messageSend, null);
      }
    }
    messageEdit.messageId && clearMessageEdit();
  };

  const handleClearSharedMessages = () => {
    dispatch(allActionsStore.shareMessageAction([]));
    setSharedMessages([]);
  };

  const clearMessageEdit = () => {
    dispatch(
      allActionsStore.editMessageAction({
        message: {},
        messageId: null,
      })
    );

    setMessage((prev) => ({ ...prev, [conversationId]: "" }));
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      let start = e.target.selectionStart,
        end = e.target.selectionEnd;
      e.preventDefault();

      setMessage((prevState) => ({
        ...prevState,
        [conversationId]:
          prevState?.[conversationId].substring(0, start) +
          "\n" +
          prevState?.[conversationId].substring(end),
      }));
    } else if (e.keyCode === 13) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // USEEFFECTS
  useEffect(() => {
    setSharedMessages(forwardMessages);
  }, [forwardMessages]);

  useEffect(() => {
    messageEdit.messageId &&
      setMessage((prev) => ({
        ...prev,
        [conversationId]: messageEdit.message.message,
      }));

    return () => messageEdit.messageId && clearMessageEdit();
  }, [messageEdit.messageId]);

  return (
    <>
      <div className={classes.root}>
        {messageEdit.messageId ? (
          <MessageEdit data={messageEdit} onClose={clearMessageEdit} />
        ) : null}
        {forwardMessages.length ? (
          <SharedMessages
            forwardMessages={forwardMessages}
            handleClearSharedMessages={handleClearSharedMessages}
          />
        ) : null}
        <div
          className={clsx(classes.wrapperInput, {
            [classes.wrapperInputShadow]:
              messageEdit.messageId || forwardMessages.length,
          })}
        >
          <LeftInputComponent />
          <TextField
            className={classes.input}
            value={message[conversationId] || ""}
            multiline={true}
            variant="standard"
            maxRows={4}
            onChange={handleChangeMessage}
            placeholder={textPlaceholderInput}
            onKeyDown={onKeyPress}
          />
          <RightInputComponent
            message={message[conversationId]}
            handleSendMessage={handleSendMessage}
            forwardMessages={forwardMessages}
          />
        </div>
      </div>
    </>
  );
};

export default MessageInput;
