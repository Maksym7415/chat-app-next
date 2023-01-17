"use client";

import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { Rnd } from "react-rnd";
import shallow from "zustand/shallow";
import LeftSide from "./components/leftSide";
import { socket } from "@/core/socket";
import {
  socketOnUserIdChat,
  socketOnTypingStateId,
  socketOnDeleteMessage,
  socketOnUserIdNewChat,
  socketOnDeleteConversation,
  socketOnClearConversation,
} from "@/core/socket/actions/socketOn";
import Meta from "@/core/seo/Meta";
import { useAuthStore } from "@/storeZustand/auth/store";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { UserService } from "@/services/user/user.service";

// STYLES
const classes = {
  container: "flex h-screen bg-[url('/bg5.png')]",
};

const styleRnd = {
  position: "relative",
  borderRight: "1px solid rgba(0, 0, 0, 0.2)",
};

const LayoutMain = ({ children, titlePage = "" }) => {
  // HOOKS
  const router = useRouter();

  // STORE
  const { conversationsList } = useConversationsStore(
    (state) => ({
      conversationsList: state.conversationsList.data,
    }),
    shallow
  );
  const { authToken } = useAuthStore(
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
      UserService.getUserProfileData();
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
    socketOnUserIdNewChat(authToken.userId, router);
    socketOnDeleteConversation({
      params: {
        id: router.query.id,
      },
      router,
    });
    socketOnClearConversation();
  }, [conversationsListMass]);

  return (
    <Meta title={titlePage || ""} >
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
        {children}
      </main>
    </Meta>
  );
};

export default LayoutMain;
