"use client";

import { useRouter } from "next/router";
import { useEffect, useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, CircularProgress } from "@mui/material";
import ChatHeader from "./components/header";
import ChatBottom from "./components/bottom";
import ChatContent from "./components/mainContent";
import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import { getMessagesWithSendDate } from "@/helpers/index";
import { actionsClearSelectedMessages } from "@/actions/index";
import Meta from "@/core/seo/Meta";
import { ConversationsService } from "@/services/conversations/conversations.service";
import { GetConversationMessagesQuery } from "@/services/conversations/service";
import { getConversationMessagesRequest } from "@/store/conversations/requests";
import {
  setAllMessagesAction,
  setMessagesChatAction,
  setOpenConversationIdAction,
} from "@/store/app/slice";

// STYLES
const classes = {
  container: "flex flex-col h-screen w-full relative ",
  errorBackText: "text-[28px] font-medium ",
};

const Chat = ({ params }) => {
  // HOOKS
  const dispatch = useDispatch();
  const router = useRouter();

  // SELECTORS
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);
  const allMessages = useSelector(({ appSlice }) => appSlice.allMessages);
  const openConversationId = useSelector(
    ({ appSlice }) => appSlice.openConversationId
  );
  const conversationsList = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );

  // STATES
  const [errorBack, setErrorBack] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // VARIABLES
  const conversationId = useMemo(
    () => router.query.id || null,
    [router.query.id]
  );
  const opponentId = 4;
  const conversationData = useMemo(
    () => conversationsList?.[conversationId] || {},
    [conversationsList, conversationId]
  );
  const typeConversation =
    conversationData?.conversationType?.toLowerCase() || "";

  const {} = GetConversationMessagesQuery({
    params: {
      // id: conversationId,
      offset: 0,
    },
    additionalUrl: `${conversationId}`,
    cb: (response) => {
      console.log(response, "response");

      //
      // useConversationsStore.getState().updateUserHistoryConversation({
      //   conversationId,
      //   data: { pagination: response?.pagination },
      // });

      const data = {
        data: response?.data,
        pagination: response?.pagination,
      };

      // useConversationsStore.getState().setConversationMessagesAction(data);
      //
      const messages = getMessagesWithSendDate(response.data)?.messages;

      dispatch(
        setAllMessagesAction({
          [conversationId]: messages,
        })
      );
      console.log(messages, "messages");
      dispatch(setMessagesChatAction(messages));
      errorBack && setErrorBack("");
    },
    errorCb: (error) => {
      setErrorBack(error?.message);
    },
  });

  // console.log(queryData, "queryData");
  // console.log(allMessages?.[conversationId], "allMessages?.[conversationId]");
  // console.log(allMessages, "allMessages");
  // USEEFFECTS
  useEffect(() => {
    // console.log(allMessages, "allMessages");
    if (!allMessages[conversationId] && conversationId) {
      // setIsFetching(true);
      // ConversationsService.getConversationMessages({
      //   data: {
      //     id: conversationId,
      //     offset: 0,
      //   },
      //   cb: (response) => {
      //     const messages = getMessagesWithSendDate(response?.data)?.messages;
      //     setAllMessagesAction({
      //       [conversationId]: messages,
      //     });
      //     setMessagesChatAction(messages);
      //     errorBack && setErrorBack("");
      //     setIsFetching(false);
      //   },
      //   errorCb: (error) => {
      //     setErrorBack(error?.message);
      //     setIsFetching(false);
      //   },
      // });
    } else {
      const messages = allMessages[conversationId] || [];
      setMessagesChatAction(messages);
    }

    conversationId !== openConversationId &&
      setOpenConversationIdAction(conversationId);

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
          userId={authToken.userId}
        />
        <ChatBottom
          firstName={authToken.firstName}
          userId={authToken.userId}
          opponentId={opponentId}
          conversationData={conversationData}
        />
      </Box>
    </>
  );
};

export default memo(Chat);
