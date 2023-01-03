import React, { useRef, useCallback } from "react";
// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import useStyles from "./styles";
import { Typography, Box } from "@mui/material";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import languages from "../../../../config/translations";
import { setMessageDate, uuid } from "../../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import Message from "./components/message";
import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { getConversationMessagesRequest } from "../../../../reduxToolkit/conversations/requests";
import { setAllMessagesAction } from "../../../../reduxToolkit/app/slice";
// need ts

const SCROLL_OFFSET = 200;
const loadMessageOffset = 15;
const limitMessage = 15;

const MainContent = ({
  userId,
  conversationId,
  opponentId,
  typeConversation,
  allMessages,
}: any) => {
  //HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );

  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  const listRef: any = React.useRef({});
  const prevConversationId: any = React.useRef(null);
  const isScrollingList: any = useRef(false);
  const isFetchingMessages: any = useRef(false);
  const messagesReverse = allMessages?.[conversationId]
    ? [...allMessages?.[conversationId]]
    : [];

  // FUNCTIONS
  const loadMessages = (isOffset, cb) => {
    if (!isFetchingMessages.current) return;

    console.log(userHistoryConversations, "userHistoryConversations");

    const data: any = {
      id: conversationId,
    };

    if (isOffset) {
      data.offset = pagination.currentPage + loadMessageOffset;
    }

    dispatch(
      getConversationMessagesRequest({
        data,
        cb: (response) => {
          dispatch(
            setAllMessagesAction({
              [conversationId]: [
                ...response.data,
                ...allMessages[conversationId],
              ],
            })
          );

          cb && cb();
        },
      })
    );
  };

  console.log(pagination, "pagination");

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (!isScrollingList?.current) return;

    const scrollBottom = scrollHeight - clientHeight;

    // console.log(clientHeight, "clientHeight");
    // console.log(scrollHeight, "scrollHeight");
    // console.log(scrollTop, "scrollTop");
    // console.log("___");
    // console.log(
    //     `[ml] handleScroll
    //     list.scrollTop=${list.scrollTop}
    //     list.offsetHeight=${list.offsetHeight}
    //     list.scrollHeight=${list.scrollHeight}`
    // );
    console.log(scrollTop, "scrollTop");

    if (
      scrollTop <= SCROLL_OFFSET &&
      !isFetchingMessages.current &&
      pagination.allItems >
        messagesReverse.filter((item) => !item?.component).length
    ) {
      isFetchingMessages.current = true;
      loadMessages(true, () => {
        isFetchingMessages.current = false;
      });
      return console.log("isFetchingMessages up");
    }

    if (
      scrollBottom - SCROLL_OFFSET <= scrollTop &&
      isFetchingMessages.current
    ) {
      isFetchingMessages.current = false;
      return console.log("isFetchingMessages down");
    }
  };
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
  });

  const getRowRender = ({ index, style, key, parent, isScrolling }) => {
    const messageData = messagesReverse[index];

    if (isScrolling && !isScrollingList.current) {
      isScrollingList.current = true;
    }
    if (!isScrolling && isScrollingList.current) {
      isScrollingList.current = false;
    }

    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {(() => {
          let isShowAvatar = false;
          if (messageData?.fkSenderId !== userId) {
            isShowAvatar = true;
          }
          if (messageData?.component) {
            // return <></>;
            return (
              <div style={{ ...style }}>
                <div className={classes.wrapperSendData} key={uuid()}>
                  <p className={classes.sendDataText}>
                    {setMessageDate(new Date(messageData.sendDate))}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div style={{ ...style }}>
              <Message
                // ref={rowRef}
                key={uuid()}
                conversationId={conversationId}
                isShowAvatar={isShowAvatar}
                messageData={messageData}
                userId={userId}
                typeConversation={typeConversation}
                // setSize={setSize}
                index={index}
              />
            </div>
          );
        })()}
      </CellMeasurer>
    );
  };

  React.useEffect(() => {
    if (
      messagesReverse.length &&
      prevConversationId.current !== conversationId
    ) {
      // listRef.current.updater.isMounted(() => console.log("mounend"));
      // console.log(listRef.current.updater, "");
      // listRef.current?.scrollToRow(messagesReverse.length);
      // prevConversationId.current = conversationId;
    }
  }, [listRef.current, conversationId]);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  // });
  console.log(listRef.current, "listRef.current");

  return (
    <Box className={classes.wrapperMessages} id="scrollableDiv">
      {(() => {
        if (Number.isNaN(conversationId) && !opponentId) {
          return (
            <RenderInfoCenterBox>
              <Typography>{languages[lang].mainScreen.chooseAChat}</Typography>
            </RenderInfoCenterBox>
          );
        } else {
          if (!conversationId) {
            return (
              <RenderInfoCenterBox>
                <Typography>
                  {languages[lang].mainScreen.sendANewMessageToStartAChat}
                </Typography>
              </RenderInfoCenterBox>
            );
          } else {
            if (
              allMessages[conversationId] &&
              allMessages[conversationId].length === 0
            ) {
              return (
                <RenderInfoCenterBox>
                  <Typography>
                    {languages[lang].mainScreen.thereAreNoMessagesInChatYet}
                  </Typography>
                </RenderInfoCenterBox>
              );
            } else {
              return (
                messagesReverse && (
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        ref={listRef}
                        height={height - 1}
                        rowCount={messagesReverse.length}
                        rowHeight={cellMeasurerCache.rowHeight}
                        width={width}
                        rowRenderer={getRowRender}
                        deferredMeasurementCache={cellMeasurerCache}
                        onScroll={handleScroll}
                        onRowsRendered={() => {
                          if (
                            messagesReverse.length &&
                            prevConversationId.current !== conversationId
                          ) {
                            listRef.current?.scrollToRow(
                              messagesReverse.length
                            );
                            prevConversationId.current = conversationId;
                          }
                        }}
                      />
                    )}
                  </AutoSizer>

                  // <AutoSizer>
                  //   {({ height, width }) => (
                  //     <List
                  //       ref={listRef}
                  //       height={height - 1}
                  //       width={width}
                  //       itemCount={messagesReverse.length}
                  //       itemSize={100}
                  //       // itemSize={getSize}
                  //       onScroll={(e) => {
                  //         console.log(e, "onScroll");
                  //       }}
                  //     >
                  //       {({ index, style }) => (
                  //         <div
                  //           style={{
                  //             ...style,
                  //             left: " 50%",
                  //             transform: "translateX(-50%)",
                  //           }}
                  //           className={classes.infiniteScroll}
                  //         >
                  //           <RowItem index={index} setSize={setSize} />
                  //         </div>
                  //       )}
                  //     </List>
                  //   )}
                  // </AutoSizer>
                )
              );
            }
          }
        }
      })()}
    </Box>
  );
};

export default React.memo(MainContent);

scrollToBottom() {
	const scrollHeight = this.messageList.scrollHeight;
	const height = this.messageList.clientHeight;
	const maxScrollTop = scrollHeight - height;
	this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }