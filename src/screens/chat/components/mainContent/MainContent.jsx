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
import RowItemMessage from "./RowItemMessage";
import { setMessagesDataInConversationsIdAction } from "@/store/historyConversationsId/slice";
import { LAST_ACTION_MESSAGES_STORE } from "@/core/constants/general";

let vDataChat = {
  id: 0,
  isScrollToDown: false,
};

const LOAD_MESSAGE_OFFSET = 15;
let countREnder = -1;
let nextFirstItemIndex = 0;
let timer = {};

const vSetDataChat = (id, bool) => {
  vDataChat = {
    ...vDataChat,
    id,
    isScrollToDown: bool,
  };
};

const MainContent = ({
  conversationId,
  typeConversation,
  messagesChat,
  scrollPositionChats,
}) => {
  const dispatch = useDispatch();
  const virtuosoRef = useRef(null);
  const [getConversationMessagesRequest] =
    conversationsApi.useLazyGetConversationMessagesQuery();

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const pagination =
    useSelector(
      ({ historyConversationsIdSlice }) =>
        historyConversationsIdSlice?.[conversationId]?.pagination
    ) || {};

  // STATES
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  // VARIABLES
  const messagesOnly = useMemo(
    () => messages.filter((item) => !item?.component) || [],
    [messages]
  );

  // FUNCTIONS
  const loadMessages = useCallback(
    ({ isOffset, direction }) => {
      const params = {};

      if (isOffset) {
        params.offset = pagination.currentPage + LOAD_MESSAGE_OFFSET;
      }

      getConversationMessagesRequest({
        params,
        additionalUrl: conversationId ? `${conversationId}` : "",
        conversationId,
        cb: (response) => {
          dispatch(
            setMessagesDataInConversationsIdAction({
              conversationId,
              messages: [...response.data, ...messages],
              pagination: response.pagination,
              lastAction: LAST_ACTION_MESSAGES_STORE.updateUP,
            })
          );

          // const newMessages  = getMessagesWithSendDate(response.data).messages;
          const newMessages = response.data;
          nextFirstItemIndex = firstItemIndex - newMessages.length;
        },
      });
    },
    [pagination, messages, firstItemIndex]
  );

  const scrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex(messages.length - 1);
  };

  const handleScroll = useCallback(
    (event) => {
      const { scrollTop } = event.target;
      console.log("scrollTop:", scrollTop);
      scrollPositionChats[conversationId] = scrollTop;
    },
    [conversationId]
  );

  // USEEFFECTS;
  useLayoutEffect(() => {
    vSetDataChat(0, false);
  }, [conversationId]);

  useLayoutEffect(() => {
    // Scroll to the last message when the component mounts or when new messages are added
    if (!vDataChat.isScrollToDown && !vDataChat.id) {
      const cacheScrollPosition = scrollPositionChats[conversationId];

      console.log(conversationId, "-----scrollPositionChats");
      timer = setTimeout(() => {
        vSetDataChat(conversationId, true);
        if (cacheScrollPosition) {
          virtuosoRef.current.scrollTop = cacheScrollPosition;
        } else {
          scrollToBottom();
        }
      }, 10);
    }
    return () => clearTimeout(timer);
  }, [messages]);

  useLayoutEffect(() => {
    setMessages(messagesChat);
    setFirstItemIndex(() => nextFirstItemIndex);
    if (!vDataChat.id) {
      setFirstItemIndex(0);
    }
  }, [messagesChat]);

  console.log(++countREnder, "-----render");

  return (
    <Virtuoso
      ref={virtuosoRef}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={messages?.length - 1}
      data={messages}
      // followOutput={true} // якщо близько до низу контейнера і приходить знизу дані то скролить на низ
      totalCount={pagination.allItems || 0}
      atTopThreshold={300}
      atBottomThreshold={300}
      defaultItemHeight={80}
      onScroll={handleScroll}
      itemContent={(i, data) => (
        <RowItemMessage
          index={i}
          messageData={data}
          conversationId={conversationId}
          typeConversation={typeConversation}
        />
      )}
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
        if (isReached) {
          // Fetch more data.
          // Don't forget to debounce your request (fetch).
        }
      }}
    />
  );
};

export default memo(MainContent);
