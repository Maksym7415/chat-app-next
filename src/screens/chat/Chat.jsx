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

const initialOptionsMessages = {
  params: {
    offset: 0,
  },
  cb: cbInitialMessages,
};

const LOAD_MESSAGE_OFFSET = 15;
let isLoadMessages = false;

let scroll = 0;
const Chat = ({ params }) => {
  // HOOKS
  const dispatch = useDispatch();

  const scrollRef = useRef(0);

  // SELECTORS
  const allMessages = useSelector(({ appSlice }) => appSlice.allMessages);
  const conversationsList = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const newChatData = useSelector(({ appSlice }) => appSlice.newChatData);

  // STATES
  const [errorBack, setErrorBack] = useState("");
  const [optionsMessages, setOptionsMessages] = useState(
    initialOptionsMessages
  );

  // VARIABLES
  const conversationId = useMemo(() => {
    isLoadMessages = false;
    newChatData.newChatId &&
      params?.id &&
      dispatch(setNewChatDataClearAction());
    setOptionsMessages(initialOptionsMessages);
    return params?.id || null;
  }, [params]);

  const opponentId = newChatData?.newChatId || null;
  const conversationData = useMemo(
    () =>
      conversationsList?.[conversationId] ||
      newChatData?.conversationData ||
      {},
    [conversationsList, conversationId, newChatData]
  );
  const typeConversation =
    conversationData?.conversationType?.toLowerCase() || "";

  const { data } = conversationsApi.useGetConversationMessagesQuery({
    params: optionsMessages.params,
    conversationId,
    additionalUrl: conversationId ? `${conversationId}` : "",
    cb(response) {
      optionsMessages.cb && optionsMessages.cb(response, conversationId);
      errorBack && setErrorBack("");
    },
    errorCb: (error) => {
      setErrorBack(error?.message);
    },
  });

  // console.log(data, "data");

  const loadMessages = useCallback(
    (isOffset, cb, pagination, messages) => {
      isLoadMessages = true;
      const params = { offset: 0 };
      if (isOffset) {
        params.offset = pagination.currentPage + LOAD_MESSAGE_OFFSET;
      }
      setOptionsMessages({
        params,
        cb: (response) => {
          dispatch(
            setAllMessagesAction({
              [conversationId]: [...response?.data, ...messages],
            })
          );
          cb && cb(getMessagesWithSendDate(response.data).messages);
        },
      });
    },
    [conversationId]
  );

  // USEEFFECTS
  useLayoutEffect(() => {
    if (allMessages[conversationId] && conversationId) {
      const messages = allMessages[conversationId] || [];
      dispatch(setMessagesChatAction(messages));
    }

    checkOpenConversationId(conversationId);
  }, [conversationId]);

  useEffect(() => {
    return () => {
      console.log(scrollRef.current, "return");
    };
  }, [conversationId]);

  if (errorBack) {
    return (
      <RenderInfoCenterBox>
        <Typography className={classes.errorBackText}>{errorBack}</Typography>
      </RenderInfoCenterBox>
    );
  }

  console.log(params?.id, "!---reder---!");
  // console.log(allMessages, "allMessages");
  // console.log(conversationsList, "conversationsList");
  // console.log(newChatData, "newChatData");
  // console.log(optionsMessages, "optionsMessages");
  // console.log(errorBack, "errorBack");

  if (!conversationId && !opponentId) {
    return <></>;
  }

  return (
    <>
      <Box className={classes.container}>
        <ChatHeader
          conversationData={conversationData}
          conversationId={conversationId}
          typeConversation={typeConversation}
          messages={allMessages?.[conversationId] || []}
        />
        <ChatContent
          typeConversation={typeConversation}
          conversationId={conversationId}
          loadMessages={loadMessages}
          messages={allMessages?.[conversationId] || []}
        />
        <ChatBottom
          opponentId={opponentId}
          conversationData={conversationData}
        />
      </Box>
    </>
  );
};

export default memo(Chat);
