"use client";

import { useMemo, memo } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { contextMenu } from "react-contexify";
import shallow from "zustand/shallow";
import { useDispatch, useSelector } from "react-redux";
import { selectedConversationContext } from "./config";
import useStyles from "./styles";
import UserAvatar from "@/components/avatar/userAvatar";
import SvgMaker from "@/components/svgMaker";
import { PATHS } from "@/config/constants/paths";
// import { setContextMenuConfigAction } from "@/components/contextMenu/redux/slice";
import { getCurrentDay } from "@/helpers/index";
import languages from "@/config/translations";
import {
  actionsSelectedConversation,
  actionsTypeActionsConversation,
} from "@/actions/index";
import { useAuthStore } from "@/storeZustand/auth/store";

const ConversationItem = ({ data, usersTyping }) => {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const { authToken } = useAuthStore(
    (state) => ({
      authToken: state.authToken,
    }),
    shallow
  );

  // FUNCTIONS
  const getString = (element) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter(
      (el) => el.isTyping && el.userId !== authToken.userId
    );
    let str = "";
    arr.forEach((el) => (str += el.firstName));
    return str;
  };
  console.log(router, "router");

  const handleClickChatItem = (id) => {
    // if (+params.id === id) return;
    router.push(`${PATHS.chat}/${id}`);
    // router.push(`${PATHS.chat}/${id}`, {
    //   id: data.conversationId,
    //   conversationData: data,
    // });
  };

  const handleClickContextChatItem = (item) => {
    actionsSelectedConversation({
      typeAction: item.value,
      dataConversation: data,
    });
  };

  // VARIABLES
  const someBodyWriting = usersTyping[data.conversationId] && getString(data);
  const isConversationDialog = data.conversationType === "Dialog";
  const contextMenuConfig = useMemo(() => {
    return selectedConversationContext(lang).filter((item) => {
      if (
        !data.Messages.length &&
        [actionsTypeActionsConversation.clearChat].includes(item.value)
      ) {
        return false;
      }
      return true;
    });
  }, [data.Messages, lang]);

  // test
  const numberOfUnreadMessages = [1, 7].includes(data.conversationId)
    ? data.conversationId
    : null;
  const isMessageUserAuth = data.Messages[0]?.User?.id === authToken.userId;
  const isReadMessageUserAuth = [1, 7].includes(data.conversationId)
    ? true
    : false;

  return (
    <div
      onContextMenu={(event) => {
        // dispatch(
        //   setContextMenuConfigAction({
        //     isShowMenu: true,
        //     messageId: 0,
        //     config: contextMenuConfig,
        //     callBackItem: handleClickContextChatItem,
        //   })
        // );
        // contextMenu.show({
        //   id: eContextMenuId.main,
        //   event: event,
        // });
      }}
      onClick={() => handleClickChatItem(data.conversationId)}
      className={clsx(classes.container, {
        // [classes.activeConversation]: data.conversationId === +params.id,
      })}
    >
      <div className={classes.dataView}>
        <div className={classes.avatarView}>
          <UserAvatar
            source={data.conversationAvatar}
            status={!isConversationDialog ? "online" : ""}
            name={data.conversationName}
            sizeAvatar={48}
          />
        </div>
        <div className={classes.wrapperBody}>
          <div className={classes.wrapperTop}>
            <div className={classes.wrapperTopLeft}>
              <span className={classes.title}>{data.conversationName}</span>
            </div>
            <div className={classes.wrapperTopRight}>
              <div className={classes.wrapperTopRightStatus}>
                {isMessageUserAuth ? (
                  <>
                    {isReadMessageUserAuth ? (
                      <SvgMaker
                        name="svgs_line_read"
                        width={20}
                        height={19}
                        strokeFill={"#48A938"}
                      />
                    ) : (
                      <SvgMaker
                        name="svgs_line_check"
                        width={20}
                        height={19}
                        strokeFill={"#48A938"}
                      />
                    )}
                  </>
                ) : null}
              </div>
              <span className={classes.time}>
                {data.Messages[0] === undefined
                  ? ""
                  : getCurrentDay(new Date(data.Messages[0].sendDate), false)}
              </span>
            </div>
          </div>
          <div className={classes.message}>
            {someBodyWriting ? (
              <p
                className={classes.messageText}
              >{`${languages[lang].generals.isTyping}... (${someBodyWriting})`}</p>
            ) : (
              <div className={classes.innerMessage}>
                {(() => {
                  const renderTextMessage = (message) => {
                    return <p className={classes.messageText}>{message}</p>;
                  };
                  if (data.Messages[0] !== undefined) {
                    if (isMessageUserAuth) {
                      return (
                        <>
                          <p
                            className={classes.whoSenderName}
                          >{`${languages[lang].generals.you}`}</p>
                          {renderTextMessage(data.Messages[0].message)}
                        </>
                      );
                    } else {
                      if (!isConversationDialog) {
                        return renderTextMessage(data.Messages[0].message);
                      } else {
                        return renderTextMessage(
                          `${data.Messages[0]?.User?.firstName}: ${data.Messages[0].message}`
                        );
                      }
                    }
                  } else {
                    return renderTextMessage(
                      languages[lang].generals.noMessages
                    );
                  }
                })()}
              </div>
            )}
            {/* <Badge
              visible={numberOfUnreadMessages}
              className={classes.numberOfUnreadMessages}
              size={24}
            >
              {numberOfUnreadMessages}
            </Badge> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ConversationItem);
