import {
  socketEmitDeleteConversation,
  socketEmitClearConversation,
} from "../@core/socket/actions/socketEmit";
import { PATHS } from "@/core/constants/paths";
import { store } from "@/store/store";
import { updateConversationListAction } from "@/store/conversations/slice";
import { setNewChatDataAction } from "@/store/app/slice";

export const actionsConversationList = (data) => (dispatch) => {
  switch (data.mode) {
    case "updateMessageConversation":
      return dispatch(
        updateConversationListAction({
          [data.conversationId]: {
            ...data.conversationsList[data.conversationId],
            Messages: data.messages,
          },
        })
      );
    default:
      return null;
  }
};

export const actionsTypeActionsConversation = {
  deleteChat: "deleteChat",
  clearChat: "clearChat",
};

export const actionsSelectedConversation = (props) => {
  const selectedChats = store.getState().appSlice.selectedChats;

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

export const actionCreateNewConversation = async (router, item) => {
  const conversationsList =
    store.getState().conversationsSlice.conversationsList.data;

  const chat = Object.values(conversationsList).find(
    (el) => el.conversationName === item.fullName
  );

  if (chat) {
    return router.push(`${PATHS.chat}/${chat.conversationId}`);
  }

  store.dispatch(
    setNewChatDataAction({
      conversationData: {
        conversationAvatar: item.userAvatar,
        conversationName: item.fullName,
        conversationType: "dialog",
      },
      newChatId: item.id,
    })
  );

  router.push(PATHS.newChat);
};
