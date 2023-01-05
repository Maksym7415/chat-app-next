import {
  socketEmitDeleteConversation,
  socketEmitClearConversation,
} from "../@core/socket/actions/socketEmit";
import { PATHS } from "@/core/constants/paths";
import { useConversationsStore } from "@/storeZustand/conversations/store";
import { useAppStore } from "@/storeZustand/app/store";

export const actionsConversationList = (data) => {
  switch (data.mode) {
    case "updateMessageConversation":
      return useConversationsStore.getState().updateConversationListAction({
        [data.conversationId]: {
          ...data.conversationsList[data.conversationId],
          Messages: data.messages,
        },
      });

    default:
      return null;
  }
};

export const actionsTypeActionsConversation = {
  deleteChat: "deleteChat",
  clearChat: "clearChat",
};

export const actionsSelectedConversation = (props) => {
  const selectedChats = useAppStore.getState().selectedChats;

  const { typeAction, dataConversation = null } = props;

  let _conversations = {};

  if (Object.keys(selectedChats).length) {
    _conversations = selectedChats;
  } else {
    if (dataConversation) {
      _conversations = {
        [dataConversation.conversationId]: dataConversation,
      };
    } else {
      return alert("Something error actionsSelectedConversation");
    }
  }

  switch (typeAction) {
    case actionsTypeActionsConversation.deleteChat:
      // for ids
      socketEmitDeleteConversation({
        ids: Object.keys(_conversations),
      });

      return;
    case actionsTypeActionsConversation.clearChat:
      // for ids
      socketEmitClearConversation({
        ids: Object.keys(_conversations),
      });
      return;
    default:
      return;
  }
};

export const actionCreateNewConversation = (router, item) => {
  const conversationsList =
    useConversationsStore.getState().conversationsList.data;

  const chat = Object.values(conversationsList).find(
    (el) => el.conversationName === item.fullName
  );

  if (chat) {
    return router.push(`${PATHS.chat}/${chat.conversationId}`);
  }

  return router.push(PATHS.newChat);
  // return history.push(PATHS.newChat, {
  //   conversationData: {
  //     conversationAvatar: item.userAvatar,
  //     conversationName: item.fullName,
  //     conversationType: "dialog",
  //   },
  //   opponentId: item.id,
  // });
};
