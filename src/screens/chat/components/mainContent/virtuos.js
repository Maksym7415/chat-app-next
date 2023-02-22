import {
  useCallback,
  useState,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageDate, uuid } from "@/helpers/index";
import Message from "./components/message";
import { Virtuoso } from "react-virtuoso";
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { setMessagesChatAction, setAllMessagesAction } from "@/store/app/slice";
import { getMessagesWithSendDate } from "@/helpers/index";

let isLoadMessages = false;
let prevChatId = -1;
let firstIndexItem = 0;
const LOAD_MESSAGE_OFFSET = 15;

// STYLES
const classes = {
  wrapperMessages: "flex flex-1 flex-col overflow-y-auto overflow-x-hidden",
  wrapperSendData: "px-[5px] w-full flex justify-center box-border",
  sendDataText:
    "max-w-[125px] w-full flex justify-center px-[7px] py-[1px] text-[#fffefeb5] rounded-[10px] overflow-hidden bg-[rgba(0, 0, 0, 0.4)]",
};

let isScrollingToDown = false;

const MainContent = ({
  conversationId,
  typeConversation,
  // messages,
  isFetchingFirst,
}) => {
  const dispatch = useDispatch();
  const virtuosoRef = useRef(null);
  const [getConversationMessagesRequest, { isFetching }] =
    conversationsApi.useLazyGetConversationMessagesQuery();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);

  const messages = useSelector(({ appSlice }) => appSlice.messagesChat);
  // VARIABLES
  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // STATES
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // FUNCTIONS
  const loadMessages = (isOffset, cb) => {
    const params = {
      id: conversationId,
    };

    if (isOffset) {
      params.offset = pagination.currentPage + LOAD_MESSAGE_OFFSET;
    }
    console.log("loadMessages");
    getConversationMessagesRequest({
      params,
      additionalUrl: conversationId ? `${conversationId}` : "",
      conversationId,
      cb: (response) => {
        // dispatch(
        //   setAllMessagesAction({
        //     [conversationId]: [...response.data, ...messages],
        //   })
        // );
        cb && cb(getMessagesWithSendDate(response.data).messages);

        setLoading(false);
      },
    });
  };

  const prependItems = useCallback(() => {
    console.log("----prependItems----");
    console.log(messages.length, "messages");
    console.log(pagination.allItems, "pagination.allItems");

    if (!isScrollingToDown) {
      return false;
    }
    console.log("Loaaddd   prependItems");
    if (
      pagination.allItems > messages.filter((item) => !item?.component).length
    ) {
      isLoadMessages = true;
      setLoading(true);
      loadMessages(true, (newMessages) => {
        const nextFirstItemIndex = firstItemIndex - newMessages.length;
        setFirstItemIndex(() => nextFirstItemIndex);
        dispatch(setMessagesChatAction([...newMessages, ...messages]));
      });
    }

    return false;
  }, [firstItemIndex, messages, pagination]);

  const scrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex(messages.length - 1);
  };

  useEffect(() => {
    // Scroll to the last message when the component mounts or when new messages are added
    let timer = {};

    if (!isLoadMessages) {
      isScrollingToDown = false;
      timer = setTimeout(() => {
        scrollToBottom();
        isScrollingToDown = true;
      }, 10);

      scrollToBottom();
    }
    return () => clearTimeout(timer);
  }, [messages]);

  // USEEFFECTS;
  useLayoutEffect(() => {
    if (
      prevChatId !== conversationId &&
      messages?.length &&
      pagination.allItems
    ) {
      setFirstItemIndex(0);
      firstIndexItem = pagination.allItems;
      prevChatId = conversationId;
    }
  }, [pagination]);

  useLayoutEffect(() => {
    isLoadMessages = false;
  }, [conversationId]);

  // RENDER;
  const rowItem = useCallback(
    (index, messageData) => {
      let isShowAvatar = false;
      if (messageData?.fkSenderId !== authToken.userId) {
        isShowAvatar = true;
      }
      if (messageData?.component) {
        return (
          <div className={classes.wrapperSendData} key={uuid()}>
            <p className={classes.sendDataText}>
              {setMessageDate(new Date(messageData.sendDate))}
            </p>
          </div>
        );
      }

      return (
        <Message
          key={uuid()}
          conversationId={conversationId}
          isShowAvatar={isShowAvatar}
          messageData={messageData}
          userId={authToken.userId}
          typeConversation={typeConversation}
          index={index}
        />
      );
    },
    [conversationId, authToken]
  );

  // if (
  //   (prevChatId !== conversationId && conversationId !== null) ||
  //   isFetchingFirst
  // ) {
  //   return <div className={classes.wrapperMessages}></div>;
  // }

  console.log("--------------");

  return (
    <div className={classes.wrapperMessages}>
      <Virtuoso
        ref={virtuosoRef}
        firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={messages?.length - 1}
        data={messages}
        startReached={() => {
          if (!loading) {
            prependItems();
          }
        }}
        itemContent={rowItem}
      />
    </div>
  );
};

export default memo(MainContent);
