"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Rnd } from "react-rnd";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import shallow from "zustand/shallow";
import LeftSide from "./components/leftSide";
import MainContent from "./components/mainContent";
import { socket } from "@/config/socket";
import {
  socketOnUserIdChat,
  socketOnTypingStateId,
  socketOnDeleteMessage,
  socketOnUserIdNewChat,
  socketOnDeleteConversation,
  socketOnClearConversation,
} from "@/config/socket/actions/socketOn";
import { getUserProfileDataRequest } from "@/store/user/requests";
import { useAuth } from "@/storeZustand/auth/store";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    backgroundImage: `url(/bg5.png)`,
  },
}));

const styleRnd = {
  position: "relative",
  borderRight: "1px solid rgba(0, 0, 0, 0.2)",
};

const MainPage = () => {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();

  // SELECTORS
  const conversationsList = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  // const authToken = useSelector(({ authSlice }) => authSlice.authToken);

  const { authToken } = useAuth(
    (state) => ({
      authToken: state.authToken,
    }),
    shallow
  );

  // STATES
  const [containerWidth, setContainerWidth] = useState(300);

  // VARIABLES
  const conversationsListMass = useMemo(
    () => Object.values(conversationsList),
    [conversationsList]
  );

  // USEEFFECTS
  useEffect(() => {
    if (authToken.userId) {
      dispatch(getUserProfileDataRequest({}));
    }
  }, [authToken]);

  useEffect(() => {
    socket.removeAllListeners();
    if (conversationsListMass?.length) {
      conversationsListMass.forEach((chat) => {
        socketOnUserIdChat(chat);
        socketOnTypingStateId(chat);
      });
    }
    socketOnDeleteMessage();
    // socketOnUserIdNewChat(authToken.userId, history);
    // socketOnDeleteConversation({ params, history });
    socketOnClearConversation();
  }, [conversationsListMass]);

  return (
    <main className={classes.container}>
      <Rnd
        style={styleRnd}
        minWidth="20vw"
        maxWidth="40vw"
        default={{
          x: 0,
          y: 0,
          width: containerWidth,
          height: "100%",
        }}
        onResize={(e, direction, ref, delta, position) => {
          ref.offsetWidth < 200 && setContainerWidth(80);
        }}
        disableDragging
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <LeftSide />
      </Rnd>
      <MainContent />
    </main>
  );
};

export default MainPage;
