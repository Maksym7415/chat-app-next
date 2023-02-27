import { useState, useMemo, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import ChatHeader from "./components/header";
import ChatBottom from "./components/bottom";
import ChatContent from "./components/mainContent";
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import { getMessagesWithSendDate } from "@/helpers/index";
import { setOpenConversationIdAction } from "@/store/app/slice";
import { setMessagesDataInConversationsIdAction } from "@/store/historyConversationsId/slice";
import { store } from "@/store/store";
import { LAST_ACTION_MESSAGES_STORE } from "@/core/constants/general";

// STYLES
const classes = {
  container: "flex flex-col h-screen w-full relative ",
  errorBackText: "text-[28px] font-medium ",
  wrapperMessages: "flex flex-1 flex-col w-full h-full",
};

// fix в консолі вискакує помилка якась якщо забрати у функції cbInitialMessages  dispatch то посмилки немає

const checkOpenConversationId = (conversationId) => {
  const openConversationId = store.getState().appSlice.openConversationId;

  if (conversationId !== openConversationId) {
    store.dispatch(setOpenConversationIdAction(conversationId));
  }
};

const scrollPositionChats = {};

const Chat = ({ params }) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const conversationsList = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const newChatData = useSelector(({ appSlice }) => appSlice.newChatData);

  // STATES
  const [errorBack, setErrorBack] = useState("");

  // VARIABLES
  const conversationId = useMemo(() => {
    return params?.id || null;
  }, [params]);

  const opponentId = newChatData?.newChatId || null;
  const conversationData = useMemo(
    () =>
      conversationsList?.[conversationId] ||
      newChatData?.conversationData ||
      {},
    [conversationsList, conversationId, newChatData, params]
  );

  const typeConversation = useMemo(
    () => conversationData?.conversationType?.toLowerCase() || "",
    [conversationData]
  );

  const messagesChat =
    useSelector(
      ({ historyConversationsIdSlice }) =>
        historyConversationsIdSlice?.[conversationId]?.messages
    ) || [];

  const [getConversationMessagesRequest] =
    conversationsApi.useLazyGetConversationMessagesQuery();

  // USEEFFECTS
  useLayoutEffect(() => {
    if (!messagesChat.length && conversationId) {
      getConversationMessagesRequest({
        params: {
          offset: 0,
        },
        additionalUrl: conversationId ? `${conversationId}` : "",
        conversationId,
        cb: (response) => {
          const messagesResult =
            getMessagesWithSendDate(response?.data)?.messages || [];

          dispatch(
            setMessagesDataInConversationsIdAction({
              conversationId,
              messages: messagesResult,
              pagination: response.pagination,
              lastAction: LAST_ACTION_MESSAGES_STORE.set,
            })
          );
        },
      });
    }
  }, [conversationId]);

  if (errorBack) {
    return (
      <RenderInfoCenterBox>
        <Typography className={classes.errorBackText}>{errorBack}</Typography>
      </RenderInfoCenterBox>
    );
  }

  console.log(params?.id, "!---reder---!");

  if (!conversationId && !opponentId && !params?.newChatId) {
    return <></>;
  }

  return (
    <>
      <Box className={classes.container}>
        <ChatHeader
          conversationData={conversationData}
          conversationId={conversationId}
          typeConversation={typeConversation}
          messages={messagesChat}
        />
        <div className={classes.wrapperMessages}>
          {messagesChat.length ? (
            <ChatContent
              typeConversation={typeConversation}
              conversationId={conversationId}
              messagesChat={messagesChat || []}
              scrollPositionChats={scrollPositionChats}
            />
          ) : null}
        </div>

        <ChatBottom
          opponentId={opponentId}
          conversationData={conversationData}
        />
      </Box>
    </>
  );
};

export default Chat;
