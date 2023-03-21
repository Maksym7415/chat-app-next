/* eslint-disable no-case-declarations */

/* eslint-disable no-shadow */

/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable global-require */
import { createSlice } from "@reduxjs/toolkit";
import {
	actionsTypeActionsChat,
	actionsTypeObject,
} from "@/core/constants/actions";
import {
	LAST_ACTION_MESSAGES_STORE,
	SIDE_LEFT_TYPE_CONTENT,
} from "@/core/constants/general";
import Snackbar from "@/helpers/notistack";

export const initialState = {
	sideLeftConfig: {
		page: SIDE_LEFT_TYPE_CONTENT.conversations,
	},
	contextMenuConfig: {
		event: null,
		isShowMenu: false,
		messageId: 0,
		config: [],
		callBackItem: null,
	},
	dialogConfig: {
		open: false,
		typeContent: "",
		title: "",
	},
	modalConfig: {
		open: false,
		renderContent: "settingProfile",
		styles: {
			container: {},
		},
	},
	drawerConfig: {
		anchor: "left",
		open: false,
		type: "",
		width: 300,
		configContent: {
			typeProfile: "",
			conversationData: {},
		},
	},
	messageEdit: {
		message: {},
		messageId: null,
	},
	forwardMessages: [],
	selectedMessages: {
		active: false,
		messages: {},
	},
	newChatData: {
		conversationData: null,
		newChatId: null,
	}, // need fix - коли зробитися роут newChatId перевірити чи потрібно цого обєкту
	selectedChats: {},
};

export const appSlice = createSlice({
	name: "appSlice",
	initialState,
	reducers: {
		/// ---- ///
		selectedMessagesAction(state, { payload }) {
			const { data, typeAction } = payload;
			const copySelectedMessages = { ...state.selectedMessages.messages };

			switch (typeAction) {
				case actionsTypeObject.add:
					state.selectedMessages = {
						...state.selectedMessages,
						messages: {
							...copySelectedMessages,
							[data?.id]: data,
						},
					};
					break;
				case actionsTypeObject.remove:
					delete copySelectedMessages[data?.id];
					const active = !!Object.keys(copySelectedMessages).length;

					state.selectedMessages = {
						...state.selectedMessages,
						active,
						messages: {
							...copySelectedMessages,
						},
					};
					break;
				default:
					break;
			}
		},

		messagesChatAction(state, { payload }) {
			const { conversationId, typeAction, messageData = null } = payload;
			const { store } = require("@/store/store");
			const { allActionsStore } = require("@/store/rootActions");
			const {
				socketEmitChatsDeleteMessage,
			} = require("@/core/socket/actions/socketEmit");

			let _messages = {};
			let messagesMass = [];
			if (Object.keys(state.selectedMessages.messages).length) {
				_messages = state.selectedMessages.messages;
			} else {
				if (messageData) {
					_messages = {
						[messageData.id]: messageData,
					};
				}
				if (!actionsTypeActionsChat.selectMessages === typeAction) {
					return Snackbar.error(
						"Something error actionsMessagesChat",
					);
				}
			}
			switch (typeAction) {
				// DELETE MESSAGE
				case actionsTypeActionsChat.deleteMessages:
					const getRemoveMessages = (conversationId, messagesIds) => {
						const allMessages =
							store.getState().conversationsSlice
								.historyConversationsId?.[conversationId]
								?.messages;
						const conversationsList =
							store.getState().conversationsSlice
								.conversationsList.data;
						// deleting a message from the message array
						const allMessagesWithoutDeleteMessage =
							allMessages?.filter(
								(message) =>
									!messagesIds?.includes(message?.id),
							);
						// check for the last element in the message array, if it is a date object, then delete it as well
						const checkIsLastDateComponent = (array) => {
							const arrayLength = array.length - 1;
							if (array?.[arrayLength]?.component) {
								return checkIsLastDateComponent(
									array.slice(0, arrayLength),
								);
							}
							return array;
						};
						const updateAllMessages = checkIsLastDateComponent(
							allMessagesWithoutDeleteMessage,
						);
						if (
							messagesIds.includes(
								conversationsList[conversationId].Messages[0]
									?.id,
							)
						) {
							store.dispatch(
								allActionsStore.updateConversationListAction({
									[conversationId]: {
										...conversationsList[conversationId],
										Messages: [
											updateAllMessages[
												updateAllMessages.length - 1
											],
										],
									},
								}),
							);
						}
						store.dispatch(
							allActionsStore.setMessagesDataInConversationsIdAction(
								{
									conversationId,
									messages: updateAllMessages,
									lastAction:
										LAST_ACTION_MESSAGES_STORE.remove,
									// pagination: response.pagination,
								},
							),
						);
					};
					// sorting through the selected messages and sending them through the socket and, if successful, delete them locally through the function - getRemoveMessages
					const messagesIds = Object.keys(_messages).map(
						(messageId) => +messageId,
					);
					return socketEmitChatsDeleteMessage(
						{
							conversationId,
							isDeleteMessage: true,
							messageId: messagesIds,
						},
						() => {
							getRemoveMessages(conversationId, messagesIds);
						},
					);
				// EDIT MESSAGE
				case actionsTypeActionsChat.editMessage:
					return Object.keys(_messages).map((messageId) => {
						state.messageEdit = {
							...state.messageEdit,
							message: _messages[messageId],
							messageId,
						};

						return messageId;
					});
				// COPY MESSAGE
				case actionsTypeActionsChat.copyMessage:
					messagesMass = Object.keys(_messages).reduce(
						(acc, messageId) => [
							...acc,
							_messages[messageId].message,
						],
						[],
					);
					const CopyMessages = messagesMass.join("\n\n");
					if (CopyMessages) {
						if (navigator.clipboard) {
							navigator.clipboard.writeText(CopyMessages);
						} else
							Snackbar.error(
								"Ваш браузер не підтримує Clipboard",
							);
					}
					Snackbar.success("Copy");
					break;
				// SELECT MESSAGES
				case actionsTypeActionsChat.selectMessages:
					state.selectedMessages = {
						active: true,
						messages: _messages,
					};
					break;
				// FORWARD MESSAGES
				case actionsTypeActionsChat.forwardMessage:
					messagesMass = Object.keys(_messages).reduce(
						(acc, messageId) => {
				
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
						},
						[],
					);
					state.dialogConfig = {
						open: true,
						typeContent: "shareMessage",
						title: "Share Message",
						data: messagesMass,
					};
					break;
				default:
					Snackbar.error("An unknown action in chat is selected");
					break;
			}

			return null;
		},

		selectedChatAction(state, { payload }) {
			const { typeAction, dataConversation = null } = payload;

			let _conversations = {};

			if (Object.keys(state.selectedChats).length) {
				_conversations = state.selectedChats;
			} else {
				if (dataConversation) {
					_conversations = {
						[dataConversation.conversationId]: dataConversation,
					};
				} else {
					return Snackbar.error(
						"Something error actionsSelectedConversation",
					);
				}
			}

			switch (typeAction) {
				case actionsTypeActionsConversation.deleteChat:
					// for ids
					return socketEmitDeleteConversation({
						ids: Object.keys(_conversations),
					});
				case actionsTypeActionsConversation.clearChat:
					// for ids
					return socketEmitClearConversation({
						ids: Object.keys(_conversations),
					});
				default:
					return null;
			}
		},

		createNewChatAction(state, { payload }) {
			const { store } = require("@/store/store");

			const { router, item } = payload;

			const conversationsList =
				store.getState().conversationsSlice.conversationsList.data;

			const chat = Object.values(conversationsList).find(
				(el) => el.conversationName === item.fullName,
			);

			if (chat) {
				return router.push(`${PATHS.chat}/${chat.conversationId}`);
			}

			state.newChatData = {
				conversationData: {
					conversationAvatar: item.userAvatar,
					conversationName: item.fullName,
					conversationType: "dialog",
				},
				newChatId: item.id,
			};

			return router.push(`${PATHS.newChat}/${item.id}`);
		},

		// sideLeftConfig
		setSideLeftConfigAction(state, { payload }) {
			state.sideLeftConfig = payload;
		},
		// contextMenuConfig
		setContextMenuConfigAction(state, { payload }) {
			state.contextMenuConfig = payload;
		},
		setContextMenuClearConfigAction(state) {
			state.contextMenuConfig = initialState.contextMenuConfig;
		},
		// dialogConfig
		setDialogWindowConfigAction(state, { payload }) {
			state.dialogConfig = payload;
		},
		setDialogWindowClearConfigAction(state) {
			state.dialogConfig = initialState.dialogConfig;
		},
		// modalConfig
		setModalConfigAction(state, { payload }) {
			state.modalConfig = payload;
		},
		setModalClearConfigAction(state) {
			state.modalConfig = initialState.modalConfig;
		},
		// drawerConfig
		setDrawerConfigAction(state, { payload }) {
			state.drawerConfig = payload;
		},
		setDrawerClearConfigAction(state) {
			state.drawerConfig = initialState.drawerConfig;
		},
		// messageEdit
		editMessageAction(state, { payload }) {
			state.messageEdit = {
				...state.messageEdit,
				...payload,
			};
		},
		// forwardMessages
		shareMessageAction(state, { payload }) {
			state.forwardMessages = payload;
		},
		// selectedMessages
		setSelectedMessagesAction(state, { payload }) {
			state.selectedMessages = payload;
		},
		resetSelectedMessagesAction(state) {
			state.selectedMessages = initialState.selectedMessages;
		},
		// newChatData
		setNewChatDataAction(state, { payload }) {
			state.newChatData = payload;
		},
		setNewChatDataClearAction(state) {
			state.newChatData = initialState.newChatData;
		},
	},
});
