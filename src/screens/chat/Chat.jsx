import {
  useEffect,
  useState,
  useMemo,
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import ChatHeader from "./components/header";
import ChatBottom from "./components/bottom";
import ChatContent from "./components/mainContent";
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import { getMessagesWithSendDate } from "@/helpers/index";
import {
  setAllMessagesAction,
  setMessagesChatAction,
  setOpenConversationIdAction,
  setNewChatDataClearAction,
} from "@/store/app/slice";
import { store } from "@/store/store";

// STYLES
const classes = {
  container: "flex flex-col h-screen w-full relative ",
  errorBackText: "text-[28px] font-medium ",
};

// fix в консолі вискакує помилка якась якщо забрати у функції cbInitialMessages  dispatch то посмилки немає

const checkOpenConversationId = (conversationId) => {
  const openConversationId = store.getState().appSlice.openConversationId;

  if (conversationId !== openConversationId) {
    store.dispatch(setOpenConversationIdAction(conversationId));
  }
};

export const cbInitialMessages = (response, conversationId, options) => {
  const dispatch = options?.dispatch || store.dispatch;

  const messagesResult =
    getMessagesWithSendDate(response?.data)?.messages || [];

  dispatch(
    setAllMessagesAction({
      [conversationId]: messagesResult,
    })
  );
  dispatch(setMessagesChatAction(messagesResult));
};

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

  const messagesChat = useSelector(
    ({ appSlice }) => appSlice.allMessages?.[conversationId] || []
  );

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
        cb: (response) =>
          cbInitialMessages(response, conversationId, {
            dispatch,
          }),
      });
    }

    // checkOpenConversationId(conversationId);
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
        <ChatContent
          typeConversation={typeConversation}
          conversationId={conversationId}
        />
        <ChatBottom
          opponentId={opponentId}
          conversationData={conversationData}
        />
      </Box>
    </>
  );
};

export default Chat;
