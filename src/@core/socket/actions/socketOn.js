import { socket } from "../index";
import { actionsConversationList } from "../../../actions";
import { PATHS } from "@/core/constants/paths";
import {
  ConversationsService,
  getUserConversationsFetcher,
} from "@/services/conversations/conversations.service";
import { setAllMessagesAction, setMessagesChatAction } from "@/store/app/slice";
import {
  setConversationListAction,
  updateConversationTypeStateAction,
} from "@/store/conversations/slice";
import { store } from "@/store/store";

// User Id Chat
export const socketOnUserIdChat = (chat) =>
  socket.on(`userIdChat${chat.conversationId}`, (message) => {
    const { allMessages, openConversationId } = store.getState().appSlice;

    const conversationsList =
      store.getState().conversationsSlice.conversationsList.data;

    const conversationFindStore = conversationsList?.[chat.conversationId];

    const updateMessageConversation = () => {
      store.dispatch(
        actionsConversationList({
          mode: "updateMessageConversation",
          conversationId: chat.conversationId,
          messages: message?.isEdit
            ? [
                {
                  ...conversationFindStore?.Messages?.[0],
                  message: message.message,
                  isEdit: true,
                },
              ]
            : [message],
          conversationsList,
        })
      );
    };
    //
    let findComponentDate = null;
    if (allMessages[chat.conversationId]) {
      const reverseAllMessages = [
        ...allMessages[chat.conversationId],
      ].reverse();
      for (
        let i = 0;
        !findComponentDate && i < reverseAllMessages.length;
        i++
      ) {
        if (reverseAllMessages[i].component) {
          findComponentDate = reverseAllMessages[i];
        }
      }
    }

    let componentDateNew = null;
    if (
      message?.sendDate?.slice(0, 10) !==
      findComponentDate?.sendDate?.slice(0, 10)
    ) {
      componentDateNew = { component: "div", sendDate: message.sendDate };
    }

    //
    const chatAllMessages = allMessages?.[chat.conversationId];
    if (chatAllMessages) {
      const prevMessages = chatAllMessages || null;
      let updateMessages = [...prevMessages];

      if (!message?.isEdit) {
        componentDateNew && updateMessages.push(componentDateNew);
        updateMessages.push(message);
      } else {
        updateMessages = updateMessages.map((item) => {
          if (item.id == message.id) {
            return { ...item, message: message.message, isEdit: true };
          }
          return item;
        });
      }

      store.dispatch(
        setAllMessagesAction({ [chat.conversationId]: updateMessages })
      );

      openConversationId &&
        chat.conversationId &&
        store.dispatch(setMessagesChatAction(updateMessages));
    }

    if (chat.Messages?.[0]?.id == message?.id) {
      updateMessageConversation();
    } else {
      !message?.isEdit && updateMessageConversation();
    }
  });

// Typing State Id
let isEmit = false;
const newTimer = {};
export const socketOnTypingStateId = (chat) => {
  const conversationTypeState =
    store.getState().conversationsSlice.conversationTypeState;

  const currentUserTyping = (user, conversationId) => {
    const fConversationType = (conversationId, user, isTyping = false) => {
      const conversation = conversationTypeState[conversationId];
      const data = {
        ...conversation,
        [user.userId]: { ...user, isTyping },
      };
      store.dispatch(
        updateConversationTypeStateAction({
          conversationId: conversationId,
          data,
        })
      );
    };
    const currentUserTypingTimer = () => {
      fConversationType(conversationId, user, true);
      newTimer[conversationId] = { ...newTimer[conversationId] };
      newTimer[conversationId][user.userId] = setTimeout(() => {
        isEmit = false;
        fConversationType(conversationId, user, false);
      }, 3000);
    };
    if (!isEmit) {
      isEmit = true;
      currentUserTypingTimer();
    } else {
      clearTimeout(newTimer[conversationId][user.userId]);
      currentUserTypingTimer();
    }
  };
  const timer = (user, conversationId) => {
    if (conversationId in newTimer) {
      currentUserTyping(user, conversationId);
    } else {
      isEmit = false;
      currentUserTyping(user, conversationId);
    }
  };
  return socket.on(`typingStateId${chat.conversationId}`, (conversation) => {
    timer(conversation, chat.conversationId);
  });
};

export const socketOnDeleteMessage = () => {
  const getRemoveMessages = (conversationId, messageId, lastMessage) => {
    const allMessages = store.getState().appSlice.allMessages;
    const conversationsList =
      store.getState().conversationsSlice.conversationsList.data;

    const conversationFindStore = conversationsList?.[conversationId];

    const updateMessages = allMessages[conversationId.toString()]?.filter(
      (message) => ![messageId?.toString()]?.includes(message?.id?.toString())
    );

    store.dispatch(
      setAllMessagesAction({
        [conversationId]: updateMessages,
      })
    );

    if (messageId === conversationFindStore?.Messages?.[0].id) {
      store.dispatch(
        actionsConversationList({
          mode: "updateMessageConversation",
          conversationId,
          // messages: [lastMessage || findLastMessage],
          messages: [lastMessage],
          conversationsList,
        })
      );
    }
  };

  return socket.on(
    "deleteMessage",
    ({ conversationId, messageId, lastMessage }) => {
      getRemoveMessages(conversationId, messageId, lastMessage);
    }
  );
};

export const socketOnUserIdNewChat = (userId, router) => {
  return socket.on(`userIdNewChat${userId}`, (message, conversationId) => {
    console.log(message, "message");
    getUserConversationsFetcher({
      options: {
        cb: (data) => {
          console.log(conversationId, "conversationId");
          // ця перевірка потрібно для того щоб коли інший юзер створює чат зі мною щоб в мене не відкривалося зразу чат з цим юзером
          if (message.User?.id !== userId) {
            return;
          }
          router.push(`${PATHS.chat}/${conversationId}`);
        },
      },
    });
  });
};

export const socketOnDeleteConversation = ({ params, router }) => {
  socket.on("deleteChat", ({ ids }) => {
    const conversationsList =
      store.getState().conversationsSlice.conversationsList.data;
    const allMessages = store.getState().appSlice.allMessages;

    let copyConversationsList = { ...conversationsList };
    let copyAllMessages = { ...allMessages };
    ids.map((id) => {
      delete copyAllMessages[id];
      delete copyConversationsList[id];
    });
    if (ids.includes(params?.id)) {
      router.push(PATHS.main);
    }
    store.dispatch(setAllMessagesAction({ ...copyAllMessages }));
    store.dispatch(setConversationListAction(copyConversationsList));
  });
};

export const socketOnClearConversation = () => {
  socket.on("clearChat", ({ ids }) => {
    const conversationsList =
      store.getState().conversationsSlice.conversationsList.data;
    const allMessages = store.getState().appSlice.allMessages;

    let copyConversationsList = { ...conversationsList };
    let copyAllMessages = { ...allMessages };
    ids.map((id) => {
      copyAllMessages[id] = [];
      copyConversationsList = {
        ...copyConversationsList,
        [id]: {
          ...copyConversationsList[id],
          Messages: [],
        },
      };
    });

    store.dispatch(setAllMessagesAction({ ...copyAllMessages }));
    store.dispatch(setConversationListAction(copyConversationsList));
  });
};
