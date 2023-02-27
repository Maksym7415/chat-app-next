import Snackbar from "../helpers/notistack";
import { socketEmitChatsDeleteMessage } from "../@core/socket/actions/socketEmit";
import { actionsConversationList } from "./conversations";
import { getMessagesWithSendDate } from "@/helpers/index";
import { LAST_ACTION_MESSAGES_STORE } from "@/core/constants/general";
import { allActionsStore } from "@/store/rootActions";
import { store } from "@/store/store";

export const actionsTypeObject = {
  add: "add",
  remove: "remove",
  clear: "clear",
};

export const actionsSelectedMessages =
  (data, typeAction) => async (dispatch, getState) => {
    const { selectedMessages } = getState().appSlice;

    const copySelectedMessages = { ...selectedMessages.messages };

    switch (typeAction) {
      case actionsTypeObject.add:
        dispatch(
          allActionsStore.setSelectedMessagesAction({
            ...selectedMessages,
            messages: {
              ...copySelectedMessages,
              [data?.id]: data,
            },
          })
        );
        return null;
      case actionsTypeObject.remove:
        delete copySelectedMessages[data?.id];

        const active = Object.keys(copySelectedMessages).length ? true : false;
        dispatch(
          allActionsStore.setSelectedMessagesAction({
            ...selectedMessages,
            active,
            messages: {
              ...copySelectedMessages,
            },
          })
        );
        return;
      case actionsTypeObject.clear:
        // isDispatch ? props.dispatch(props.setAction({})) : props.setAction({});
        return {};
      default:
        return;
    }
    actionsForTypeWithObjKey({
      prevData: { ...selectedMessages },
      prevDataKey: { ...selectedMessages.messages },
      key: data?.id || null,
      data,
      typeAction,
      dispatch: dispatch,
      // setAction: allActionsStore.setSelectedMessagesAction,
    });
  };

export const actionsTypeActionsChat = {
  deleteMessages: "deleteMessages",
  editMessage: "editMessage",
  copyMessage: "copyMessage",
  forwardMessage: "forwardMessage",
  replyMessage: "replyMessage",
  selectMessages: "selectMessages",
};

export const actionsMessagesChat = (props) => {
  const selectedMessages = store.getState().appSlice.selectedMessages;
  const openConversationId = store.getState().appSlice.openConversationId;

  const { conversationId, typeAction, messageData = null } = props;

  let _messages = {};

  let messagesMass = [];

  if (Object.keys(selectedMessages.messages).length) {
    _messages = selectedMessages.messages;
  } else {
    if (messageData) {
      _messages = {
        [messageData.id]: messageData,
      };
    }
    if (!actionsTypeActionsChat.selectMessages === typeAction) {
      return alert("Something error actionsMessagesChat");
    }
  }

  switch (typeAction) {
    // DELETE MESSAGE
    case actionsTypeActionsChat.deleteMessages:
      const getRemoveMessages = (conversationId, messagesIds) => {
        const allMessages =
          store.getState().conversationsSlice.historyConversationsId?.[
            conversationId
          ]?.messages;
        const conversationsList =
          store.getState().conversationsSlice.conversationsList.data;

        // deleting a message from the message array
        let allMessagesWithoutDeleteMessage = allMessages?.filter(
          (message) => !messagesIds?.includes(message?.id)
        );

        // check for the last element in the message array, if it is a date object, then delete it as well
        const checkIsLastDateComponent = (array) => {
          const arrayLength = array.length - 1;

          if (array?.[arrayLength]?.component) {
            return checkIsLastDateComponent(array.slice(0, arrayLength));
          }

          return array;
        };

        const updateAllMessages = checkIsLastDateComponent(
          allMessagesWithoutDeleteMessage
        );

        if (
          messagesIds.includes(
            conversationsList[conversationId].Messages[0]?.id
          )
        ) {
          store.dispatch(
            allActionsStore.actionsConversationList({
              mode: "updateMessageConversation",
              conversationId,
              messages: [updateAllMessages[updateAllMessages.length - 1]],
              conversationsList,
            })
          );
        }

        store.dispatch(
          allActionsStore.setMessagesDataInConversationsIdAction({
            conversationId: conversationId,
            messages: updateAllMessages,
            lastAction: LAST_ACTION_MESSAGES_STORE.remove,
            // pagination: response.pagination,
          })
        );
      };

      // sorting through the selected messages and sending them through the socket and, if successful, delete them locally through the function - getRemoveMessages

      const messagesIds = Object.keys(_messages).map((messageId) => +messageId);

      return socketEmitChatsDeleteMessage(
        {
          conversationId,
          isDeleteMessage: true,
          messageId: messagesIds,
        },
        () => {
          getRemoveMessages(conversationId, messagesIds);
        }
      );

    // EDIT MESSAGE
    case actionsTypeActionsChat.editMessage:
      return Object.keys(_messages).map((messageId) =>
        store.dispatch(
          allActionsStore.editMessageAction({
            message: _messages[messageId],
            messageId,
          })
        )
      );

    // COPY MESSAGE
    case actionsTypeActionsChat.copyMessage:
      messagesMass = Object.keys(_messages).reduce((acc, messageId) => {
        return [...acc, _messages[messageId].message];
      }, []);

      const CopyMessages = messagesMass.join("\n\n");
      // CopyMessages && Clipboard.setString(CopyMessages);

      if (CopyMessages) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(CopyMessages);
        } else alert("Ваш браузер не підтримує Clipboard");
      }

      return Snackbar.success("Copy");

    // SELECT MESSAGES
    case actionsTypeActionsChat.selectMessages:
      return store.dispatch(
        allActionsStore.setSelectedMessagesAction({
          active: true,
          messages: _messages,
        })
      );

    // FORWARD MESSAGES
    case actionsTypeActionsChat.forwardMessage:
      messagesMass = Object.keys(_messages).reduce((acc, messageId) => {
        const messageData = _messages[messageId];
        acc.push({
          Files: messageData.Files,
          User: messageData.User,
          fkSenderId: messageData.fkSenderId,
          id: messageData.id,
          isEditing: messageData.isEditing,
          message: messageData.message,
          sendDate: messageData.sendDate,
        });
        return acc;
      }, []);

      return store.dispatch(
        allActionsStore.setDialogWindowConfigAction({
          open: true,
          typeContent: "shareMessage",
          title: "Share Message",
          data: messagesMass,
        })
      );

    default:
      return Snackbar.error("An unknown action in chat is selected");
  }
};
