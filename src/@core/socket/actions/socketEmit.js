import { socket } from "../index";
import Snackbar from "@/helpers/notistack";
import { store } from "@/store/store";

export const socketEmitSendFiles = (
	files,
) => {
	if (!files) return null;

	return null;
};

export const socketEmitChatsDeleteMessage = (
	data = {
		conversationId: "",
		isDeleteMessage: false,
		messageId: [],
	},
	cb,
) => {
	socket.emit("chats", data, () => {
		// why success is false?
		cb();
	});
};

export const socketEmitChatsTypingState = (user, conversationId) => {
	socket.emit("typingState", user, conversationId);
};

export const socketEmitDeleteConversation = (
	data = {
		id: 0,
	},
) => {
	socket.emit("deleteChat", data);
};

export const socketEmitClearConversation = (
	data = {
		id: 0,
	},
) => {
	socket.emit("clearChat", data);
};

export const socketEmitSendMessage = ({
	id,
	messageSend,
	forwardedFromId,
	opponentId,
	conversationId,
	setMessage,
}) => {
	const { userId } = store.getState().authSlice.authToken;
	const { messageEdit } = store.getState().appSlice;

	const body = {
		conversationId: +id,
		message: messageSend,
		messageId: messageEdit.messageId,
		userId,
		opponentId,
		forwardedFromId: forwardedFromId || null,
	};

	socket.emit("chats", body, (success) => {
		if (success) setMessage((prev) => ({ ...prev, [conversationId]: "" }));
	});
};

export const socketEmitChatCreation = ({
	data,
	date,
	chatName,
	imageData,
	imageFormat,
	cb,
}) => {
	socket.emit(
		"chatCreation",
		data,
		date,
		chatName,
		imageData,
		imageFormat,
		(success) => {
			if (success) {
				cb && cb();
			} else {
				Snackbar.error("Щось пішло не так");
			}
		},
	);
};
