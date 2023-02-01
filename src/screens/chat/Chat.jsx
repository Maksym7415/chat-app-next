import { useEffect, useState, useMemo, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, CircularProgress } from "@mui/material";
import ChatHeader from "./components/header";
import ChatBottom from "./components/bottom";
import ChatContent from "./components/mainContent";
import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import { getMessagesWithSendDate } from "@/helpers/index";
import { actionsClearSelectedMessages } from "@/actions/index";
import { GetConversationMessagesQuery } from "@/services/conversations/service";
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

// в консолі вискакує помилка якась якщо забрати у функції cbInitialMessages  dispatch то посмилки немає
const checkOpenConversationId = (conversationId) => {
  const openConversationId = store.getState().appSlice.openConversationId;

  if (conversationId !== openConversationId) {
    store.dispatch(setOpenConversationIdAction(conversationId));
  }
};

const LOAD_MESSAGE_OFFSET = 15;
let isLoadMessages = false;

const Chat = ({ params }) => {
  // HOOKS
  const dispatch = useDispatch();

  // SELECTORS
  const allMessages = useSelector(({ appSlice }) => appSlice.allMessages);
  const conversationsList = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const newChatData = useSelector(({ appSlice }) => appSlice.newChatData);

  const cbInitialMessages = (response, conversationId) => {
    const messages = getMessagesWithSendDate(response?.data)?.messages || [];
    dispatch(
      setAllMessagesAction({
        [conversationId]: messages,
      })
    );
    dispatch(setMessagesChatAction(messages));
    // store.dispatch(
    //   setAllMessagesAction({
    //     [conversationId]: messages,
    //   })
    // );
    // store.dispatch(setMessagesChatAction(messages));
  };

  const initialOptionsMessages = {
    params: {
      offset: 0,
    },
    cb: cbInitialMessages,
  };

  // STATES
  const [errorBack, setErrorBack] = useState("");
  const [isFetching, setIsFetching] = useState(false);
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

  const {} = GetConversationMessagesQuery({
    params: optionsMessages.params,
    conversationId,
    additionalUrl: conversationId ? `${conversationId}` : null,
    cb: (response) => {
      // if (!isServerSide) {
      //   if (isLoadMessages) {
      //   } else {
      //     cbInitialMessages(response, conversationId);
      //   }
      // }

      console.log(response, "response");

      optionsMessages.cb && optionsMessages.cb(response, conversationId);
      errorBack && setErrorBack("");
    },
    errorCb: (error) => {
      setErrorBack(error?.message);
    },
  });

  const loadMessages = useCallback((isOffset, cb, pagination, messages) => {
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
  }, []);

  // console.log(queryData, "queryData");
  // console.log(allMessages?.[conversationId], "allMessages?.[conversationId]");
  // console.log(allMessages, "allMessages");

  // USEEFFECTS
  useEffect(() => {
    if (allMessages[conversationId] && conversationId) {
      const messages = allMessages[conversationId] || [];
      dispatch(setMessagesChatAction(messages));
    }

    checkOpenConversationId(conversationId);

    return () => {
      console.log("!---return---!");

      // setMessagesChatAction([]);
      // actionsClearSelectedMessages(false);
    };
  }, [conversationId]);

  if (isFetching) {
    return (
      <RenderInfoCenterBox>
        <CircularProgress size={60} />
      </RenderInfoCenterBox>
    );
  }

  if (errorBack) {
    return (
      <RenderInfoCenterBox>
        <Typography className={classes.errorBackText}>{errorBack}</Typography>
      </RenderInfoCenterBox>
    );
  }

  console.log("!---reder---!");

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
