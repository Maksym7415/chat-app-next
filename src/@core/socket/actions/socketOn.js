import { socket } from "../index";
import { actionsConversationList } from "../../../actions";
import { PATHS } from "@/core/constants/paths";
import { useAppStore } from "@/storeZustand/app/store";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import {
  ConversationsService,
  getUserConversationsFetcher,
} from "@/services/conversations/conversations.service";

// User Id Chat
export const socketOnUserIdChat = (chat) =>
  socket.on(`userIdChat${chat.conversationId}`, (message) => {
    const allMessages = useAppStore.getState().allMessages;
    const openConversationId = useAppStore.getState().openConversationId;

    const conversationsList =
      useConversationsStore.getState().conversationsList.data;

    const conversationFindStore = conversationsList?.[chat.conversationId];

    const updateMessageConversation = () => {
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
      });
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

      useAppStore
        .getState()
        .setAllMessagesAction({ [chat.conversationId]: updateMessages });

      openConversationId &&
        chat.conversationId &&
        useAppStore.getState().setMessagesChatAction(updateMessages);
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
    useConversationsStore.getState().conversationTypeState;

  const currentUserTyping = (user, conversationId) => {
    const fConversationType = (conversationId, user, isTyping = false) => {
      const conversation = conversationTypeState[conversationId];
      const data = {
        ...conversation,
        [user.userId]: { ...user, isTyping },
      };
      useConversationsStore.getState().updateConversationTypeStateAction({
        conversationId: conversationId,
        data,
      });
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
    const allMessages = useAppStore.getState().allMessages;
    const conversationsList =
      useConversationsStore.getState().conversationsList.data;

    const conversationFindStore = conversationsList?.[conversationId];

    const updateMessages = allMessages[conversationId.toString()]?.filter(
      (message) => ![messageId?.toString()]?.includes(message?.id?.toString())
    );

    useAppStore.getState().setAllMessagesAction({
      [conversationId]: updateMessages,
    });

    if (messageId === conversationFindStore?.Messages?.[0].id) {
      actionsConversationList({
        mode: "updateMessageConversation",
        conversationId,
        // messages: [lastMessage || findLastMessage],
        messages: [lastMessage],
        conversationsList,
      });
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
    const allMessages = useAppStore.getState().allMessages;
    const conversationsList =
      useConversationsStore.getState().conversationsList.data;

    let copyConversationsList = { ...conversationsList };
    let copyAllMessages = { ...allMessages };
    ids.map((id) => {
      delete copyAllMessages[id];
      delete copyConversationsList[id];
    });
    if (ids.includes(params?.id)) {
      router.push(PATHS.main);
    }
    console.log(conversationsList, "conversationsList");
    console.log(copyConversationsList, "copyConversationsList");
    useAppStore.getState().setAllMessagesAction({ ...copyAllMessages });
    useConversationsStore
      .getState()
      .setConversationListAction(copyConversationsList);
    console.log("socketOnDeleteConversation");
  });
};

export const socketOnClearConversation = () => {
  socket.on("clearChat", ({ ids }) => {
    const allMessages = useAppStore.getState().allMessages;
    const conversationsList =
      useConversationsStore.getState().conversationsList.data;
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
    console.log(allMessages, "allMessages");
    console.log(copyAllMessages, "copyAllMessages");
    useAppStore.getState().setAllMessagesAction({ ...copyAllMessages });
    useConversationsStore
      .getState()
      .setConversationListAction(copyConversationsList);
  });
};
