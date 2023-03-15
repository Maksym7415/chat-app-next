import { socket } from "../index";
import Snackbar from "@/helpers/notistack";
import { store } from "@/store/store";

const filesCount = 0;

export const socketEmitSendFiles = (
	data = {
		userId: "",
		conversationId: "",
		message: "",
	},
	files,
) => {
	if (!files) return;

	// let fileReader = new FileReader();
	// if (files) {
	//   let filesArray = Object.values(files);
	//   const handleEmitFile = async (messageId, sendDate) => {
	//     if (filesCount === filesArray.length) {
	//       filesCount = 0;
	//     } else {
	//       // await handleGetBufferFile(
	//       //   fileReader,
	//       //   filesArray[filesCount],
	//       //   filesArray[filesCount].size,
	//       //   filesArray[filesCount].name,
	//       //   data.userId,
	//       //   data.conversationId,
	//       //   socket,
	//       //   data.message,
	//       //   filesArray[filesCount].type,
	//       //   filesArray.length,
	//       //   dispatch,
	//       //   messageId,
	//       //   sendDate,
	//       // );
	//       // filesCount++;
	//       // handleEmitFile(messageId, sendDate);
	//     }
	//   };
	//   socket.emit(
	//     "files",
	//     {
	//       conversationId: data.conversationId,
	//       message: {
	//         message: data.message,
	//         fkSenderId: data.userId,
	//         sendDate: fullDate(new Date()),
	//         messageType: "File",
	//         isEdit: false,
	//       },
	//     },
	//     (id) => {
	//       if (id) handleEmitFile(id, fullDate(new Date()));
	//     }
	//   );
	// }
};

export const socketEmitChatsDeleteMessage = (
	data = {
		conversationId: "",
		isDeleteMessage: false,
		messageId: [],
	},
	cb,
) => {
	socket.emit("chats", data, (success) => {
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
