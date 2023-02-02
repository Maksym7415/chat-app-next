import { useCallback, useState, memo, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import RenderInfoCenterBox from "@/components/renders/renderInfoCenterBox";
import languages from "@/core/translations";
import { setMessageDate, uuid } from "@/helpers/index";
import Message from "./components/message";
import { Virtuoso } from "react-virtuoso";
import { setMessagesChatAction } from "@/store/app/slice";

let prevChatId = -1;
let firstIndexItem = 0;

// STYLES
const classes = {
  wrapperMessages: "flex flex-1 flex-col overflow-y-auto overflow-x-hidden",
  wrapperSendData: "px-[5px] w-full flex justify-center box-border",
  sendDataText:
    "max-w-[125px] w-full flex justify-center px-[7px] py-[1px] text-[#fffefeb5] rounded-[10px] overflow-hidden bg-[rgba(0, 0, 0, 0.4)]",
};

const MainContent = ({ conversationId, typeConversation, loadMessages }) => {
  const dispatch = useDispatch();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );
  const messages = useSelector(({ appSlice }) => appSlice.messagesChat);
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);

  // VARIABLES
  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // STATES
  const [firstItemIndex, setFirstItemIndex] = useState(0);

  // FUNCTIONS
  const prependItems = useCallback(() => {
    if (
      pagination.allItems > messages.filter((item) => !item?.component).length
    ) {
      loadMessages(
        true,
        (newMessages) => {
          const nextFirstItemIndex = firstItemIndex - newMessages.length;
          setFirstItemIndex(() => nextFirstItemIndex);
          firstIndexItem = nextFirstItemIndex;
          dispatch(setMessagesChatAction([...newMessages, ...messages]));
        },
        pagination,
        messages
      );
    }

    return false;
  }, [firstItemIndex, messages, pagination]);

  // USEEFFECTS;
  useLayoutEffect(() => {
    if (
      prevChatId !== conversationId &&
      messages?.length &&
      pagination.allItems
    ) {
      setFirstItemIndex(pagination.allItems);
      firstIndexItem = pagination.allItems;
      prevChatId = conversationId;
    }
  }, [pagination]);

  // RENDER;
  const rowItem = useCallback(
    (index, messageData) => {
      let isShowAvatar = false;
      if (messageData?.fkSenderId !== authToken.userId) {
        isShowAvatar = true;
      }
      if (messageData?.component) {
        return (
          <div className={classes.wrapperSendData} key={uuid()}>
            <p className={classes.sendDataText}>
              {setMessageDate(new Date(messageData.sendDate))}
            </p>
          </div>
        );
      }

      return (
        <Message
          key={uuid()}
          conversationId={conversationId}
          isShowAvatar={isShowAvatar}
          messageData={messageData}
          userId={authToken.userId}
          typeConversation={typeConversation}
          index={index}
        />
      );
    },
    [conversationId, authToken]
  );

  if (prevChatId !== conversationId && conversationId !== null) {
    return <div className={classes.wrapperMessages}></div>;
  }

  console.log("--------------");
  // console.log(prevChatId, "prevChatId");
  // console.log(conversationId, "conversationId");
  // console.log(pagination, "pagination");
  console.log(messages, "messages");
  // console.log(lang, "lang");
  // console.log(authToken, "authToken");
  // console.log(typeConversation, "typeConversation");
  // console.log(firstIndexItem, "firstIndexItem");
  // console.log(firstItemIndex, "firstItemIndex");
  // console.log(
  //   prevChatId !== conversationId &&
  //     conversationId !== null &&
  //     firstIndexItem === firstItemIndex,
  //   "logg"
  // );

  return (
    <div className={classes.wrapperMessages}>
      {(() => {
        if (!conversationId) {
          return (
            <RenderInfoCenterBox>
              <Typography>
                {languages[lang].mainScreen.sendANewMessageToStartAChat}
              </Typography>
            </RenderInfoCenterBox>
          );
        } else {
          if (messages && messages.length === 0) {
            return (
              <RenderInfoCenterBox>
                <Typography>
                  {languages[lang].mainScreen.thereAreNoMessagesInChatYet}
                </Typography>
              </RenderInfoCenterBox>
            );
          } else {
            return (
              <Virtuoso
                firstItemIndex={firstItemIndex}
                initialTopMostItemIndex={messages?.length - 1}
                data={messages}
                startReached={prependItems}
                itemContent={rowItem}
              />
            );
          }
        }
      })()}
    </div>
  );
};

export default memo(MainContent);

{
  /* return (
  <Virtuoso
    firstItemIndex={firstItemIndex}
    initialTopMostItemIndex={messages?.length - 1}
    data={messages}
    startReached={prependItems}
    itemContent={rowItem}
  />
); */
}

{
  /* return messages.map((item, index) => {
  return rowItem(index, item);
}); */
}
