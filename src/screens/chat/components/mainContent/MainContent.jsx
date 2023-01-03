"use client";

import { useCallback, useState, memo, useLayoutEffect } from "react";
import useStyles from "./styles";
import { Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RenderInfoCenterBox from "@/components/renders/renderInfoCenterBox";
import languages from "@/config/translations";
import { setMessageDate, uuid, getMessagesWithSendDate } from "@/helpers/index";
import Message from "./components/message";
import { Virtuoso } from "react-virtuoso";
import { getConversationMessagesRequest } from "@/store/conversations/requests";
import { setAllMessagesAction, setMessagesChatAction } from "@/store/app/slice";

// need ts
const LOAD_MESSAGE_OFFSET = 15;

let prevChatId = -1;

const MainContent = ({ userId, conversationId, typeConversation }) => {
  //HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );

  const messages = useSelector(({ appSlice }) => appSlice.messagesChat);

  // VARIABLES
  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // STATES
  const [firstItemIndex, setFirstItemIndex] = useState(0);

  // FUNCTIONS
  const loadMessages = (isOffset, cb) => {
    const data = {
      id: conversationId,
    };

    if (isOffset) {
      data.offset = pagination.currentPage + LOAD_MESSAGE_OFFSET;
    }

    dispatch(
      getConversationMessagesRequest({
        data,
        cb: (response) => {
          dispatch(
            setAllMessagesAction({
              [conversationId]: [...response.data, ...messages],
            })
          );
          cb && cb(getMessagesWithSendDate(response.data).messages);
        },
      })
    );
  };

  const prependItems = useCallback(() => {
    if (
      pagination.allItems > messages.filter((item) => !item?.component).length
    ) {
      loadMessages(true, (newMessages) => {
        const nextFirstItemIndex = firstItemIndex - newMessages.length;
        setFirstItemIndex(() => nextFirstItemIndex);
        dispatch(setMessagesChatAction([...newMessages, ...messages]));
      });
    }

    return false;
  }, [firstItemIndex, messages, pagination]);

  // USEEFFECTS
  useLayoutEffect(() => {
    if (
      prevChatId !== conversationId &&
      messages.length &&
      pagination.allItems
    ) {
      setFirstItemIndex(pagination.allItems);

      prevChatId = conversationId;
    }
  }, [pagination]);

  // RENDER
  const rowItem = (index, messageData) => {
    let isShowAvatar = false;
    if (messageData?.fkSenderId !== userId) {
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
        userId={userId}
        typeConversation={typeConversation}
        index={index}
      />
    );
  };

  if (prevChatId !== conversationId && conversationId !== null) {
    return <></>;
  }

  return (
    <Box className={classes.wrapperMessages}>
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
                initialTopMostItemIndex={messages.length - 1}
                data={messages}
                startReached={prependItems}
                itemContent={rowItem}
              />
            );
          }
        }
      })()}
    </Box>
  );
};

export default memo(MainContent);
