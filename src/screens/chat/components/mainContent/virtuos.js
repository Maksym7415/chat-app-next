import React, { useCallback, useState } from "react";
import useStyles from "./styles";
import { Typography, Box } from "@mui/material";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import languages from "../../../../config/translations";
import {
  setMessageDate,
  uuid,
  getMessagesWithSendDate,
} from "../../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import Message from "./components/message";
import { Virtuoso } from "react-virtuoso";
import { getConversationMessagesRequest } from "../../../../reduxToolkit/conversations/requests";
import {
  setAllMessagesAction,
  setMessagesChatAction,
} from "../../../../reduxToolkit/app/slice";
import usePrevious from "../../../../hooks/usePrevious";

// need ts
const LOAD_MESSAGE_OFFSET = 15;

let index = 0;
let prevChatId = -1;

const MainContent = ({
  userId,
  conversationId,
  typeConversation,
}: // allMessages,
any) => {
  //HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  // const prevChatId = usePrevious(conversationId);

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );

  const messages = useAppSelector(({ appSlice }) => appSlice.messagesChat);

  // VARIABLES
  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // STATES
  // const [messages, setMessages] = React.useState([]);
  const [_, setMessages] = React.useState([]);
  const [firstItemIndex, setFirstItemIndex] = useState(0);

  // FUNCTIONS
  const loadMessages = (isOffset, cb) => {
    const data: any = {
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
  }, [firstItemIndex, messages, setMessages, pagination]);

  // USEEFFECTS
  React.useLayoutEffect(() => {
    if (
      prevChatId !== conversationId &&
      messages.length &&
      pagination.allItems
    ) {
      console.log("useLayoutEffect");

      setFirstItemIndex(pagination.allItems);

      prevChatId = conversationId;
    }
  }, [pagination]);

  // RENDER
  const rowItem = (index: any, messageData) => {
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

  // console.log(messages, "messages");
  console.log(`render ${++index} ${firstItemIndex}`);
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

export default React.memo(MainContent);
