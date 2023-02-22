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
import { conversationsApi } from "@/rtkQuery/conversations/serviceRedux";
import { setAllMessagesAction, setMessagesChatAction } from "@/store/app/slice";
import { getMessagesWithSendDate } from "@/helpers/index";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

let isLoadMessages = false;
let prevChatId = -1;
const LOAD_MESSAGE_OFFSET = 15;
let scrollToTop = 0;
let firstItemIndex = 0;

// STYLES
const classes = {
  // wrapperMessages: "flex flex-1 flex-col overflow-y-auto overflow-x-hidden",
  wrapperMessages: "flex flex-1 flex-col",
  wrapperSendData: "px-[5px] w-full flex justify-center box-border",
  sendDataText:
    "max-w-[125px] w-full flex justify-center px-[7px] py-[1px] text-[#fffefeb5] rounded-[10px] overflow-hidden bg-[rgba(0, 0, 0, 0.4)]",
};

const MainContentWIndow = ({
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

  const getScrollingContainer = () => {
    const list = listRef.current.Grid._scrollingContainer;

    const scrollTop = list.scrollTop; // отримуємо scrollTop
    const scrollHeight = list.scrollHeight; // отримуємо scrollHeight
    const clientHeight = list.clientHeight; // отримуємо clientHeight
    const hasScroll = clientHeight < scrollHeight;
    const visibleHeight = list.offsetHeight;
    const listBottom = scrollTop + visibleHeight;
    const pixelsUntilListBottom = clientHeight - listBottom;

    return {
      scrollTop,
      scrollHeight,
      clientHeight,
      hasScroll,
      visibleHeight,
      listBottom,
      pixelsUntilListBottom,
    };
  };

  const loadMoreItems = ({ direction, scrollTop }) => {
    // console.log(direction, "----loadMoreItems----");
    if (
      pagination.allItems >
        messages.filter((item) => !item?.component).length &&
      direction === "up"
    ) {
      console.log("----loadMoreIs----");
      isLoadMessages = true;
      setLoading(true);
      loadMessages(true, (newMessages) => {
        firstItemIndex = firstItemIndex + newMessages.length;
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
          visibleHeight,
          listBottom,
          pixelsUntilListBottom,
        } = getScrollingContainer();

        console.log("-----loadMessages");
        console.log(scrollTop, "scrollTop");
        console.log(scrollHeight, "scrollHeight");
        console.log(clientHeight, "clientHeight");
        console.log(visibleHeight, "visibleHeight");
        console.log(listBottom, "listBottom");
        console.log(pixelsUntilListBottom, "pixelsUntilListBottom");

        scrollToTop = visibleHeight;
      });
    }
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      const list = listRef.current;

      const { scrollTop, scrollHeight, clientHeight, hasScroll } =
        getScrollingContainer();

      const isScrolledToBottom =
        scrollTop > 0 && scrollHeight - clientHeight - scrollTop < 10; // перевіряємо, чи є останній елемент
      if (isScrolledToBottom) {
        // якщо наразі відображається останній елемент списку, можна виконати якусь дію
        console.log("Scrolled to bottom!");
      } else {
        if (hasScroll) {
          console.log("-----scrollToPosition");
          console.log(list.props.height, "list.props.height");
          console.log(scrollTop, "scrollTop");
          console.log(scrollHeight, "scrollHeight");
          console.log(clientHeight, "clientHeight");

          list.scrollToPosition(list.props.height);
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (conversationId !== prevChatId && messages.length) {
      scrollToBottom();
      firstItemIndex = 0;
      prevChatId = conversationId;
    }
    if (conversationId === prevChatId && messages.length) {
      const { scrollTop, scrollHeight, clientHeight } = getScrollingContainer();

      // console.log("-----useLayoutEffect");
      // console.log(scrollTop, "scrollTop");
      // console.log(scrollHeight, "scrollHeight");
      // console.log(clientHeight, "clientHeight");

      // console.log(listRef.current, "listRef.current");

      // console.log(scrollHeight - scrollToTop, "scrollHeight - scrollToTop");

      // scrollToTop && listRef.current.scrollToPosition(scrollToTop);

      // const height = listRef.current.getEstimatedTotalSize();
      // const list = listRef.current;

      const list = listRef.current;

      // console.log(startIndex, "startIndex");

      console.log(list, "list");

      // console.log(firstItemIndex, "firstItemIndex");

      // list.scrollToRow(firstItemIndex);

      // console.log(
      //   listRef.current.Grid.visibleCellIndices,
      //   "listRef.current.Grid.visibleCellIndices"
      // );
      // if (listRef.current.Grid.visibleCellIndices) {
      //   const { Grid } = listRef.current;
      //   console.log(Grid, "Grid");
      //   const visibleRange = Grid.getVisibleCellRange();
      //   const startIndex = visibleRange.startIndex;
      //   const endIndex = visibleRange.endIndex;
      //   console.log(startIndex, "startIndex");
      // }
    }
    // scrollToBottom();
  }, [messages]);

  // USEEFFECTS;
  useLayoutEffect(() => {
    isLoadMessages = false;
  }, [conversationId]);

  // RENDER
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      // Відображаємо повідомлення з вказаним індексом
      const messageData = messages[index];

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

  // console.log("--------------REnder MainContentWIndow");
  return (
    <div
      className={classes.wrapperMessages}
      style={{ height: "100%", width: "100%" }}
    >
      {/* <button
        onClick={() => {
          const { scrollTop, scrollHeight, clientHeight } =
            getScrollingContainer();

          console.log("-----Get listRef");
          console.log(scrollTop, "scrollTop");
          console.log(scrollHeight, "scrollHeight");
          console.log(clientHeight, "clientHeight");

          console.log(listRef.current, "listRef.current");

          console.log(scrollHeight - scrollToTop, "scrollHeight - scrollToTop");
        }}
      >
        Get listRef
      </button> */}
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowCount={messages.length}
            rowHeight={cache.rowHeight}
            rowRenderer={({ index, key, style, parent }) => {
              return (
                <CellMeasurer
                  cache={cache}
                  key={key}
                  parent={parent}
                  rowIndex={index}
                >
                  {rowRenderer({ index, key, style })}
                </CellMeasurer>
              );
            }}
            ref={listRef}
            overscanRowCount={10}
            deferredMeasurementCache={cache}
            onScroll={({ scrollTop, scrollHeight, clientHeight, ...rest }) => {
              if (scrollTop === 0 && !loading) {
                console.log("---------onScroll");
                console.log(rest, "rest");
                console.log(scrollTop, "scrollTop");
                console.log(scrollHeight, "scrollHeight");
                console.log(clientHeight, "clientHeight");
                // Виконуємо логіку завантаження нових повідомлень при скролі вверх
                loadMoreItems({ direction: "up", scrollTop });
              } else if (
                scrollHeight - scrollTop === clientHeight &&
                !loading
              ) {
                // Виконуємо логіку завантаження нових повідомлень при скролі вниз

                loadMoreItems({ direction: "down", scrollTop });
              } else if (
                scrollTop > 0 &&
                scrollHeight - scrollTop - clientHeight < 500 &&
                !loading
              ) {
                // Виконуємо логіку завантаження нових повідомлень при наближенні до кінця списку
                loadMoreItems({ direction: "nearEnd", scrollTop });
              }
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default memo(MainContentWIndow);
