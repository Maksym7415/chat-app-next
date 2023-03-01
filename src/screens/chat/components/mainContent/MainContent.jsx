import {
  useCallback,
  useState,
  memo,
  useLayoutEffect,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Virtuoso } from "react-virtuoso";
import RowItemMessage from "./RowItemMessage";
import { LAST_ACTION_MESSAGES_STORE } from "@/core/constants/general";
import { conversationsApi } from "@/store/conversations/api";
import { allActionsStore } from "@/store/rootActions";

const LOAD_MESSAGE_OFFSET = 15;

let vDataChat = {
  id: 0,
  isScrollToDown: false,
};
let prevChatId = -1;
let nextFirstItemIndex = 0;
let timer = {};
let scrollTopLocal = 0;

// test
let countREnder = -1;

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
      ({ conversationsSlice }) =>
      conversationsSlice.historyConversationsId?.[conversationId]?.pagination
    ) || {};

  // STATES
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [messages, setMessages] = useState([]);

  // VARIABLES
  const messagesOnly = useMemo(
    () => messages.filter((item) => !item?.component) || [],
    [messages]
  );
  const cacheScrollPosition = scrollPositionChats[conversationId];

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
            allActionsStore.setMessagesDataInConversationsIdAction({
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
      scrollTopLocal = scrollTop;
    },
    [conversationId]
  );

  // USEEFFECTS;
  useLayoutEffect(() => {
    vSetDataChat(0, false);
    prevChatId = conversationId;
    scrollTopLocal = 0;
    return () => {
      scrollPositionChats[conversationId] = scrollTopLocal;
    };
  }, [conversationId]);

  useLayoutEffect(() => {
    setMessages(messagesChat);

    if (!vDataChat.id) {
      setFirstItemIndex(pagination.allItems);
    } else {
      setFirstItemIndex(() => nextFirstItemIndex);
    }
  }, [messagesChat]);

  if (prevChatId !== conversationId && conversationId !== null) {
    return <></>;
  }

  const scrollToPosition = () => {
    timer = setTimeout(() => {
      virtuosoRef.current.scrollTo({ top: cacheScrollPosition });
      clearTimeout(timer);
    }, 20);
  };

  console.log(++countREnder, "-----render");

  return (
    <Virtuoso
      ref={virtuosoRef}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={messages?.length - 1}
      data={messages}
      initialScrollTop={cacheScrollPosition || 0}
      itemsRendered={(items) => {
        // if (!vDataChat.isScrollToDown && !vDataChat.id && items?.length) {
        //   if (cacheScrollPosition) {
        //     scrollToPosition();
        //   } else {
        //     // scrollToBottom();
        //   }
        //   vSetDataChat(conversationId, true);
        // }

        // if (!vDataChat.isScrollToDown && !vDataChat.id && items?.length) {
        //   const cacheScrollPosition = scrollPositionChats[conversationId];

        //   console.log(conversationId, "-----scrollPositionChats");
        //   if (cacheScrollPosition) {
        //     timer = setTimeout(() => {
        //       virtuosoRef.current.scrollTo({ top: cacheScrollPosition });
        //     }, 20);
        //   } else {
        //     // timer = setTimeout(() => {
        //     //   scrollToBottom();
        //     // }, 100);
        //   }
        // }
        return items;
      }}
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
