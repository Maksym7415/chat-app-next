import { useEffect, useState, useMemo, memo, useLayoutEffect } from "react";
import clsx from "clsx";
import { contextMenu } from "react-contexify";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as config from "./config";
import languages from "@/core/translations";
import { TYPES_CONVERSATIONS } from "@/core/constants/general";
import { CONTEXT_MENU_ID } from "@/core/constants/general";
import { getCurrentDay } from "@/helpers/index";
import UserAvatar from "@/components/avatar/userAvatar";
import {
  actionsTypeObject,
} from "@/core/constants/actions";
import { allActionsStore } from "@/store/rootActions";
import { store } from "@/store/store";

const stylePaper = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  borderRadius: 10,
  overflow: "hidden",
};

// STYLES
const classes = {
  root: "grid gap-x-[5px] p-[5px]",
  wrapper: "box-border",
  wrapperUp: "flex relative",
  paperSharedMessage: "bg-[#d6f6e3]",
  // wrapperTextMessageShared: "relative px-[0px] py-[10px] pl-[10px]",
  wrapperTextMessageShared: "relative ",
  edited: "text-right text-[9px]",
  paperSenderMessage: "paper-message bg-green-500",
  paperFriendMessage: "paper-message bg-white",
  wrapperName: "flex justify-between",
  wrapperDate: "flex justify-end",
  name: "text-black",
  messageSendTime: "text-black",
  messageText: "text-black break-keep",
  wrapperMessageUserName: "text-black font-semibold",
  selectedMessages: "bg-[#84cafe] bg-opacity-20",
  divider: "absolute left-0 top-0 w-[3px] h-full bg-green-500",
  wrapperFile: "",
  image: "w-[200px] h-[200px] object-contain",
  messageSelectControl: "flex self-end rounded-[50%] border-2 border-white",
  messageSelected: "bg-[#00C73E] p-[2px]",
  messageSelectedIcon: "w-[18px] h-[18px] text-white",
};

// fix - цікаво мигає коли є Divider

const Message = ({
  messageData,
  isShowAvatar,
  userId,
  typeConversation,
  conversationId,
}) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);
  const selectedMessages = useSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );

  const selfMessage = authToken?.userId === messageData.User?.id;

  // STATES
  const [settings, setSettings] = useState({
    typeMessage: "",
    classNames: {
      root: "",
      rootPaper: "",
      wrapperMessage: {},
    },
    styles: {},
  });

  // FUNCTIONS
  const handleOnPressChat = () => {
    if (selectedMessages.active && messageData.message) {
      selectedMessages?.messages?.[messageData.id]
        ? dispatch(
            allActionsStore.selectedMessagesAction({
              data: messageData,
              typeAction: actionsTypeObject.remove,
            })
          )
        : dispatch(
            allActionsStore.selectedMessagesAction({
              data: messageData,
              typeAction: actionsTypeObject.add,
            })
          );
    }
  };

  const handleClickContextMessage = async (item) => {
    await dispatch(
      allActionsStore.messagesChatAction({
        conversationId,
        typeAction: item.value,
        messageData,
      })
    );
    contextMenu.hideAll();
  };

  // USEEFFECTS
  useLayoutEffect(() => {
    // shared message
    if (messageData.forwardedUser) {
      return setSettings((prev) => ({
        ...prev,
        typeMessage: "shared",
        classNames: {
          wrapperMessage: classes.wrapperTextMessageShared,
        },
      }));
    }
    // myMessage message
    if (messageData.fkSenderId === userId) {
      return setSettings((prev) => ({
        ...prev,
        typeMessage: "myMessage",
      }));
    }
    // otherUser message
    return setSettings((prev) => ({
      ...prev,
      typeMessage: "otherUser",
    }));
  }, []);

  const classesRootPaper = useMemo(() => {
    if (messageData.forwardedUser) return classes.paperSharedMessage;
    if (messageData.fkSenderId === userId) return classes.paperSenderMessage;
    return classes.paperFriendMessage;
  }, []);

  return (
    <div
      className={clsx(classes.root, {
        [classes.selectedMessages]: selectedMessages?.[messageData.id],
      })}
      onClick={handleOnPressChat}
      style={{
        gridTemplateColumns: selectedMessages.active ? "26px 1fr" : "1fr",
        cursor: selectedMessages.active ? "pointer" : "inherit",
      }}
    >
      {selectedMessages.active && (
        <div
          className={classes.messageSelectControl}
          style={{
            padding: selectedMessages?.messages?.[messageData.id] ? 0 : 11,
          }}
        >
          {selectedMessages?.messages?.[messageData.id] && (
            <IconButton className={classes.messageSelected}>
              <CheckIcon className={classes.messageSelectedIcon} />
            </IconButton>
          )}
        </div>
      )}
      <div
        className={classes.wrapperUp}
        style={{
          justifyContent: selfMessage ? "flex-end" : "flex-start",
        }}
        onContextMenu={(event) => {
          if (selectedMessages.active) return;

          dispatch(
            allActionsStore.setContextMenuConfigAction({
              isShowMenu: true,
              messageId: 0,
              config: config.selectedMessageContext(lang).filter((item) => {
                if (!selfMessage) {
                  return !item.self;
                }
                return true;
              }),
              callBackItem: handleClickContextMessage,
            })
          );

          contextMenu.show({
            id: CONTEXT_MENU_ID.main,
            event: event,
          });
        }}
      >
        {[TYPES_CONVERSATIONS.chat].includes(typeConversation) &&
          isShowAvatar && (
            <UserAvatar
              source={messageData.User.userAvatar}
              name={`${messageData.User.firstName} ${messageData.User.lastName}`}
              sizeAvatar={38}
              styles={{ marginRight: "10px" }}
            />
          )}
        <div className={classes.wrapper}>
          <div className={classesRootPaper} style={stylePaper}>
            {messageData.isEdit && (
              <p className={classes.edited}>
                {languages[lang].generals.edited}
              </p>
            )}
            {[TYPES_CONVERSATIONS.chat, TYPES_CONVERSATIONS.dialog].includes(
              typeConversation
            ) &&
              messageData.forwardedUser && (
                <div className={classes.wrapperName}>
                  <p className={classes.name}>
                    {messageData.forwardedUser
                      ? languages[lang].generals.forwardedMessage
                      : messageData.User.tagName ||
                        `${messageData.User.firstName} ${messageData.User.lastName}`}
                  </p>
                </div>
              )}
            <div className={settings.classNames.wrapperMessage}>
              {/* {messageData.forwardedUser && (
                <Divider className={classes.divider} />
              )} */}
              <div>
                {messageData.forwardedUser && (
                  <p className={classes.wrapperMessageUserName}>
                    {messageData.User.tagName ||
                      `${messageData.User.firstName} ${messageData.User.lastName}`}
                  </p>
                )}
                {messageData.Files && !!messageData.Files.length && (
                  <div
                    className={classes.wrapperFile}
                    style={{
                      alignSelf: selfMessage ? "flex-end" : "flex-start",
                    }}
                  >
                    {/* {messageData.Files.map((file) =>
                      ["png", "jpg", "jpeg"].includes(file.extension) ? (
                        <Image
                          key={uuid()}
                          className={classes.image}
                          source={{
                            uri: `${process.env._APP_BASE_URL}/${file.fileStorageName}.${file.extension}`,
                          }}
                        />
                      ) : null
                    )} */}
                  </div>
                )}
                {messageData.message && (
                  <p className={classes.messageText}>{messageData.message}</p>
                )}
              </div>
            </div>
            <div className={classes.wrapperDate}>
              <p className={classes.messageSendTime}>
                {getCurrentDay(new Date(messageData.sendDate), true)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
