"use client";

import { useEffect, useState, useMemo, memo } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import shallow from "zustand/shallow";
import { useDispatch, useSelector } from "react-redux";
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

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  errorBackText: { fontSize: 28, fontWeight: "500" },
}));

const classes = {
  container: "flex flex-col h-screen w-full relative ",
  errorBackText: "text-[28px] font-medium ",
};

const Chat = ({ params }) => {
  // HOOKS
  const dispatch = useDispatch();
  // const classes = useStyles();

  console.log(params, "params");
  // SELECTORS
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);
  const allMessages = useSelector(({ appSlice }) => appSlice.allMessages);
  const openConversationId = useSelector(
    ({ appSlice }) => appSlice.openConversationId
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
  );
};

export default memo(Chat);
