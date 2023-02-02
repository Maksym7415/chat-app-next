import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
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
import { GetUserConversationsQuery } from "@/services/conversations/service";
import { GetUserProfileDataQuery } from "@/services/user/service";

// STYLES
const classes = {
  container: "flex h-screen bg-[url('/bg5.png')]",
};

const styleRnd = {
  position: "relative",
  borderRight: "1px solid rgba(0, 0, 0, 0.2)",
};

const LayoutMain = ({ children, titlePage = "", params = {} }) => {
  // HOOKS
  const router = useRouter();

  // SERVICES
  GetUserConversationsQuery({});
  GetUserProfileDataQuery({});

  // SELECTORS
  const conversationsList = useSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);

  // STATES
  const [containerWidth, setContainerWidth] = useState(300);

  // VARIABLES
  const conversationsListMass = useMemo(
    () => Object.values(conversationsList),
    [conversationsList]
  );

  const conversationSelect = useMemo(
    () => (params?.id ? conversationsList[params?.id] || null : null),
    [params]
  );

  const getTitlePage = () => {
    if (titlePage) {
      return titlePage;
    }

    if (params?.id) {
      if (conversationSelect?.conversationName) {
        return conversationSelect?.conversationName;
      }
      return "Chat";
    }

    return "";
  };

  const getDescriptionPage = () => {
    if (params?.id) {
      return "Chat with me";
    }

    return "";
  };

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
    <Meta title={getTitlePage()} description={getDescriptionPage()}>
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
