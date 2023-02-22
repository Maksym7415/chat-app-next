import {
  useCallback,
  useState,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import languages from "@/core/translations";
import { setMessageDate, uuid } from "@/helpers/index";
import Message from "./components/message";
import { Virtuoso } from "react-virtuoso";
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { setAllMessagesAction, setMessagesChatAction } from "@/store/app/slice";
import { getMessagesWithSendDate } from "@/helpers/index";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";

let isLoadMessages = false;
let prevChatId = -1;
const LOAD_MESSAGE_OFFSET = 15;
let scrollToTop = 0;

// STYLES
const classes = {
  // wrapperMessages: "flex flex-1 flex-col overflow-y-auto overflow-x-hidden",
  wrapperMessages: "flex flex-1 flex-col",
  wrapperSendData: "px-[5px] w-full flex justify-center box-border",
  sendDataText:
    "max-w-[125px] w-full flex justify-center px-[7px] py-[1px] text-[#fffefeb5] rounded-[10px] overflow-hidden bg-[rgba(0, 0, 0, 0.4)]",
};

const MainContentWIndowReact = ({
  conversationId,
  typeConversation,
  // messages,
  // isFetchingFirst,
}) => {
  const dispatch = useDispatch();
  const [getConversationMessagesRequest, { isFetching }] =
    conversationsApi.useLazyGetConversationMessagesQuery();
  const listRef = useRef();
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  // SELECTORS
  const lang = useSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );
  const authToken = useSelector(({ authSlice }) => authSlice.authToken);
  const messages = useSelector(
    ({ appSlice }) => appSlice.allMessages?.[conversationId] || []
  );

  // VARIABLES
  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // STATES
  const [loading, setLoading] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

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
        dispatch(
          setAllMessagesAction({
            [conversationId]: [...response.data, ...messages],
          })
        );
        cb && cb(getMessagesWithSendDate(response.data).messages);
        setLoading(false);
        // setLoading(false);
      },
    });
  };

  const loadMoreItems = ({ direction, scrollTop }) => {
    console.log(direction, "----loadMoreItems----");
    if (
      pagination.allItems >
        messages.filter((item) => !item?.component).length &&
      direction === "up"
    ) {
      console.log("----loadMoreIs----");
      isLoadMessages = true;
      setLoading(true);
      loadMessages(true, (newMessages) => {
        const scrollHeight =
          listRef.current.Grid._scrollingContainer.scrollHeight;
        scrollToTop = scrollTop;
        // setScrollTop(listRef.current.Grid._scrollingContainer.scrollTop);
        // listRef.current.scrollToPosition(scrollTop);
        // dispatch(setMessagesChatAction([...newMessages, ...messages]));
      });
    }
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      const list = listRef.current;

      console.log(list, "list");
      // const scrollTop = listRef.current.Grid._scrollingContainer.scrollTop; // отримуємо scrollTop
      // const scrollHeight =
      //   listRef.current.Grid._scrollingContainer.scrollHeight; // отримуємо scrollHeight
      // const clientHeight =
      //   listRef.current.Grid._scrollingContainer.clientHeight; // отримуємо clientHeight
      // const hasScroll = clientHeight < scrollHeight;

      // const isScrolledToBottom =
      //   scrollTop > 0 && scrollHeight - clientHeight - scrollTop < 10; // перевіряємо, чи є останній елемент
      // if (isScrolledToBottom) {
      //   // якщо наразі відображається останній елемент списку, можна виконати якусь дію
      //   console.log("Scrolled to bottom!");
      // } else {
      //   if (hasScroll) {
      //     console.log("-----scrollToPosition");
      //     console.log(list.props.height, "list.props.height");
      //     console.log(scrollTop, "scrollTop");
      //     console.log(scrollHeight, "scrollHeight");
      //     console.log(clientHeight, "clientHeight");

      //     list.scrollToPosition(list.props.height);
      //   }
      // }
    }
  };

  useLayoutEffect(() => {
    if (conversationId !== prevChatId && messages.length) {
      scrollToBottom();
      prevChatId = conversationId;
    }
    if (conversationId === prevChatId && messages.length) {
      console.log(scrollToTop, "scrollToTop");
      console.log(listRef.current, "listRef.current");
      // const scrollHeight =
      //   listRef.current.Grid._scrollingContainer.scrollHeight;
      // console.log(scrollHeight, "scrollHeight");
      // scrollToTop &&
      //   listRef.current.scrollToPosition(scrollHeight - scrollToTop);

      cache.clearAll();
    }
    // scrollToBottom();
  }, [messages]);

  const isItemLoaded = (itemsCount) => (index) => {
    return itemsCount - index > 5;
  };

  // USEEFFECTS;
  useLayoutEffect(() => {
    isLoadMessages = false;
  }, [conversationId]);

  // RENDER
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      // Відображаємо повідомлення з вказаним індексом
      const messageData = messages[index];

      if (!messageData) {
        return <div key={key} style={style}></div>;
      }

      let isShowAvatar = false;
      if (messageData?.fkSenderId !== authToken.userId) {
        isShowAvatar = true;
      }
      if (messageData?.component) {
        return (
          <div key={key} style={style}>
            <div className={classes.wrapperSendData} key={uuid()}>
              <p className={classes.sendDataText}>
                {setMessageDate(new Date(messageData.sendDate))}
              </p>
            </div>
          </div>
        );
      }

      return (
        <div key={key} style={style}>
          <Message
            key={uuid()}
            conversationId={conversationId}
            isShowAvatar={isShowAvatar}
            messageData={messageData}
            userId={authToken.userId}
            typeConversation={typeConversation}
            index={index}
          />
        </div>
      );
    },
    [conversationId, authToken, messages]
  );

  const hasNextPage = messages.length
    ? pagination.allItems > messages.length
    : false;
  const itemCount = hasNextPage ? messages.length + 1 : messages.length;

  return (
    <div
      className={classes.wrapperMessages}
      style={{ height: "100%", width: "100%" }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={(index) => index < messages.length}
            itemCount={itemCount}
            threshold={20}
            loadMoreItems={!hasNextPage ? () => {} : loadMoreItems}
            ref={listRef}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                key={`${width}${height}`}
                height={height}
                width={width}
                itemCount={messages.length}
                itemSize={100}
                onItemsRendered={onItemsRendered}
                ref={(list) => {
                  ref(list);
                  // listRef.current = list;
                }}
              >
                {rowRenderer}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export default memo(MainContentWIndowReact);
