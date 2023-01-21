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
import { UserService } from "@/services/user/user.service";
import { GetUserConversationsQuery } from "@/services/conversations/service";

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
  const dispatch = useDispatch();
  const router = useRouter();
  GetUserConversationsQuery({});

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

  console.log(params, "params");
  console.log(conversationsList, "conversationsList");
  console.log(conversationSelect, "conversationSelect");

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

  // console.log(queryConversations.data, "queryConversations");
  // console.log(conversationsList, "conversationsList");
  return (
    <Meta title={getTitlePage()}>
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
