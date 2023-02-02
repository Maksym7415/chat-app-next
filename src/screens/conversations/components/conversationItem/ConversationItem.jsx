import { useMemo, memo } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { contextMenu } from "react-contexify";
import { selectedConversationContext } from "./config";
import UserAvatar from "@/components/avatar/userAvatar";
import SvgMaker from "@/components/svgMaker";
import { setContextMenuConfigAction } from "@/components/contextMenu/redux/slice";
import { PATHS } from "@/core/constants/paths";
import { CONTEXT_MENU_ID } from "@/core/constants/general";
import languages from "@/core/translations";
import { getCurrentDay } from "@/helpers/index";
import {
  actionsSelectedConversation,
  actionsTypeActionsConversation,
} from "@/actions/index";

// STYLES
const classes = {
  container:
    "px-[5px] py-[10px] min-h-[82px] cursor-pointer mt-[5px] hover:bg-[#dfe7f4] rounded-[20px]",
  wrapperTop: "flex justify-between",
  wrapperTopRight: "flex",
  wrapperTopRightStatus: "mr-[1px]",
  time: "font-normal text-[13px] text-[#95999A]",
  selectedChat: "bg-red",
  dataView: "flex",
  wrapperBody: "flex-1 overflow-hidden",
  title: "font-bold text-[16px] text-[#222222]",
  avatarView: "mr-[10px]",
  whoSenderName: "font-bold text-[15px] m-[0px] text-[#434449]",
  message: "flex",
  innerMessage: "",
  messageText:
    "font-normal text-[15px] text-[#8D8E90] m-[0px] overflow-hidden line-clamp-1",
  numberOfUnreadMessages: "ml-[5px] bg-[#dfe7f4] text-[#ffffff]",
  wrapperTopLeft: "",
  activeConversation: "bg-[#dfe7f4]",
};

const ConversationItem = ({ data, usersTyping, paramsId }) => {
  // HOOKS
  const dispatch = useDispatch();
  const router = useRouter();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);

  // FUNCTIONS
  const getString = (element) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter(
      (el) => el.isTyping && el.userId !== authToken.userId
    );
    let str = "";
    arr.forEach((el) => (str += el.firstName));
    return str;
  };

  const handleClickChatItem = (id) => {
    if (+paramsId === id) return;

    // dispatch(setLoadingSearchContacts(true));
    router.push(`${PATHS.chat}/${id}`);
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
        dispatch(
          setContextMenuConfigAction({
            isShowMenu: true,
            messageId: 0,
            config: contextMenuConfig,
            callBackItem: handleClickContextChatItem,
          })
        );

        contextMenu.show({
          id: CONTEXT_MENU_ID.main,
          event: event,
        });
      }}
      onClick={() => handleClickChatItem(data.conversationId)}
      className={clsx(classes.container, {
        [classes.activeConversation]: data.conversationId === +paramsId,
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
