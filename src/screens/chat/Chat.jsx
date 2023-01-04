"use client";

import { useEffect, useState, useMemo, memo } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import shallow from "zustand/shallow";
import { useDispatch } from "react-redux";
import ChatHeader from "./components/header";
import ChatBottom from "./components/bottom";
import ChatContent from "./components/mainContent";
// import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import { getMessagesWithSendDate } from "@/helpers/index";
import { actionsClearSelectedMessages } from "@/actions/index";
import { getConversationMessagesRequest } from "@/store/conversations/requests";
import {
  setAllMessagesAction,
  setMessagesChatAction,
  setOpenConversationIdAction,
} from "@/store/app/slice";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import Meta from "@/core/seo/Meta";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useAppStore } from "@/storeZustand/app/store";

// STYLES
const classes = {
  container: "flex flex-col h-screen w-full relative ",
  errorBackText: "text-[28px] font-medium ",
};

const Chat = ({ params }) => {
  // HOOKS
  const dispatch = useDispatch();

  const { authToken } = useAuthStore(
    (state) => ({
      authToken: state.authToken,
    }),
    shallow
  );
  const { allMessages, openConversationId } = useAppStore(
    (state) => ({
      allMessages: state.allMessages,
      openConversationId: state.openConversationId,
    }),
    shallow
  );
  const { conversationsList } = useConversationsStore(
    (state) => ({
      conversationsList: state.conversationsList.data,
    }),
    shallow
  );

  // STATES
  const [errorBack, setErrorBack] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // VARIABLES
  const conversationId = useMemo(() => params?.id || null, [params]);
  const opponentId = 4;
  const conversationData = useMemo(
    () => conversationsList?.[conversationId] || {},
    [conversationsList, conversationId]
  );
  const typeConversation =
    conversationData?.conversationType?.toLowerCase() || "";

  // USEEFFECTS
  useEffect(() => {
    if (!allMessages[conversationId] && conversationId) {
      setIsFetching(true);
      dispatch(
        getConversationMessagesRequest({
          data: {
            id: conversationId,
            offset: 0,
          },
          cb: (response) => {
            const messages = getMessagesWithSendDate(response.data).messages;

            dispatch(
              setAllMessagesAction({
                [conversationId]: messages,
              })
            );
            dispatch(setMessagesChatAction(messages));
            errorBack && setErrorBack("");
            setIsFetching(false);
          },
          errorCb: (error) => {
            setErrorBack(error.message);
            setIsFetching(false);
          },
        })
      );
    } else {
      const messages = allMessages[conversationId] || [];
      dispatch(setMessagesChatAction(messages));
    }

    conversationId !== openConversationId &&
      dispatch(setOpenConversationIdAction(conversationId));

    return () => {
      actionsClearSelectedMessages(false);
    };
  }, [conversationId]);

  // if (isFetching) {
  //   return (
  //     <RenderInfoCenterBox>
  //       <CircularProgress size={60} />
  //     </RenderInfoCenterBox>
  //   );
  // }

  // if (errorBack) {
  //   return (
  //     <RenderInfoCenterBox>
  //       <Typography className={classes.errorBackText}>{errorBack}</Typography>
  //     </RenderInfoCenterBox>
  //   );
  // }

  return (
    <>
      <Meta title={conversationData?.conversationName || "Chat"} />
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
