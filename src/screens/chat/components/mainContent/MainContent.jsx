import {
  useCallback,
  useState,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { setAllMessagesAction } from "@/store/app/slice";
import RowItemMessage from "./RowItemMessage";

let isScrollingToDown = false;
let isLoadMessages = false;
let prevChatId = -1;
let addLocalMessages = true;
const LOAD_MESSAGE_OFFSET = 15;
let countREnder = -1;

// STYLES
const classes = {
  // wrapperMessages: "flex flex-1 flex-col overflow-y-auto overflow-x-hidden",
  wrapperMessages: "flex flex-1 flex-col w-full h-full",
};

const MainContent = ({ conversationId, typeConversation }) => {
  const dispatch = useDispatch();
  const virtuosoRef = useRef(null);
  const [getConversationMessagesRequest, { isLoading }] =
    conversationsApi.useLazyGetConversationMessagesQuery();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );
  const messagesChat = useSelector(
    ({ appSlice }) => appSlice.allMessages?.[conversationId] || []
  );

  // STATES
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  // VARIABLES
  const messagesOnly = useMemo(
    () => messages.filter((item) => !item?.component) || [],
    [messages]
  );

  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // FUNCTIONS
  const loadMessages = useCallback(
    ({ isOffset, direction }) => {
      const params = {
        // id: conversationId,
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
          dispatch(
            setAllMessagesAction({
              [conversationId]: [...response.data, ...messages],
            })
          );
          // const newMessages  = getMessagesWithSendDate(response.data).messages;
          const newMessages = response.data;
          const nextFirstItemIndex = firstItemIndex - newMessages.length;
          isLoadMessages = true;
          addLocalMessages = true;
          setMessages((prev) => [...newMessages, ...prev]);
          setFirstItemIndex(() => nextFirstItemIndex);
        },
      });
    },
    [pagination, messages, firstItemIndex]
  );

  const scrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex(messages.length - 1);
  };

  useLayoutEffect(() => {
    // Scroll to the last message when the component mounts or when new messages are added
    let timer = {};

    if (!isLoadMessages && addLocalMessages) {
      isScrollingToDown = false;
      timer = setTimeout(() => {
        scrollToBottom();
        isScrollingToDown = true;
      }, 10);
    }

    return () => clearTimeout(timer);
  }, [messages]);

  // USEEFFECTS;
  useLayoutEffect(() => {
    if (
      prevChatId !== conversationId &&
      messagesChat?.length &&
      pagination.allItems
    ) {
      setFirstItemIndex(0);
      prevChatId = conversationId;
      addLocalMessages = true;
      setMessages(messagesChat);
    }
  }, [pagination]);

  useLayoutEffect(() => {
    if (
      prevChatId === conversationId &&
      messagesChat?.length &&
      pagination.allItems &&
      !isLoadMessages
    ) {
      setMessages(messagesChat);
      addLocalMessages = false;
    }
  }, [messagesChat]);

  useLayoutEffect(() => {
    isLoadMessages = false;
  }, [conversationId]);

  // console.log("--------------");

  // if (prevChatId !== conversationId && conversationId !== null) {
  //   return <div className={classes.wrapperMessages}></div>;
  // }

  console.log(++countREnder, "-----render");
  console.log(messages, "messages");
  return (
    <div className={classes.wrapperMessages}>
      <Virtuoso
        ref={virtuosoRef}
        firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={messages?.length - 1}
        data={messages}
        // initialItemCount={15}
        startReached={() => {
          console.log("startReached");
        }}
        totalCount={pagination.allItems || 0}
        atTopThreshold={300}
        atBottomThreshold={300}
        defaultItemHeight={80}
        itemContent={(i, data) => (
          <RowItemMessage
            index={i}
            messageData={data}
            conversationId={conversationId}
            typeConversation={typeConversation}
          />
        )}
        followOutput={true}
        atTopStateChange={(isReached) => {
          if (isReached) {
            if (pagination.allItems > messagesOnly.length) {
              loadMessages({
                isOffset: true,
                direction: "up",
              });
            }
          }
        }}
        atBottomStateChange={(isReached) => {
          console.log(isReached, "atBottomStateChange");
          if (isReached) {
            // Fetch more data.
            // Don't forget to debounce your request (fetch).
          }
        }}
      />
    </div>
  );
};

export default memo(MainContent);
